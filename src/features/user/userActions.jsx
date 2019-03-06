import moment from 'moment';
import cuid from 'cuid';
import { toastr } from 'react-redux-toastr';
import {
	asyncActionError,
	asyncActionStart,
	asyncActionFinish
} from '../async/asyncActions';

export const updateProfile = (user) => async (
	dispatch,
	getState,
	{ getFirebase }
) => {
	// console.log(user);

	const firebase = getFirebase();
	// The spread operator creates a new 'updateUser' object
	// Because isLoaded & isEmpt have been deconstructed separately
	// The new object wont include the isLoaded & isEmpty object properties
	const { isLoaded, isEmpty, ...updatedUser } = user;

	if (
		updatedUser.dateOfBirth &&
		updatedUser.dateOfBirth._isAMomentObject
	) {
		updatedUser.dateOfBirth = moment(
			updatedUser.dateOfBirth
		).toDate();
	}

	// if (updatedUser.dateOfBirth) {
	// 	updatedUser.dateOfBirth = moment(
	// 		updatedUser.dateOfBirth
	// 	).toDate();
	// }
	try {
		// 'updateProfile' is a react-redux-firebase method
		// This takes a user object and updates our firestore user.profile document
		// This is the firebase method
		await firebase.updateProfile(updatedUser);
		toastr.success('Success!', 'Profile Updated');
	} catch (error) {
		console.log(error);
	}
};

export const uploadProfileImage = (file, fileName) => async (
	dispatch,
	getState,
	{ getFirebase, getFirestore }
) => {
	const imageName = cuid();
	const firebase = getFirebase();
	const firestore = getFirestore();
	// This method is asyncronous so you dont need to call the await method
	const user = firebase.auth().currentUser;
	const path = `${user.uid}/user_images`;
	const options = {
		name: imageName
	};
	try {
		dispatch(asyncActionStart());
		// dispatch(asyncActionStart());
		// upload the file to fb storage
		let uploadedFile = await firebase.uploadFile(
			path,
			file,
			null,
			options
		);
		// get url of image
		let downloadURL = await uploadedFile.uploadTaskSnapshot
			.downloadURL;
		// get the userdoc from firestore
		let userDoc = await firestore.get(`users/${user.uid}`);
		// check if user has photo, if not update profile
		if (!userDoc.data().photoURL) {
			await firebase.updateProfile({
				photoURL: downloadURL
			});
			await user.updateProfile({
				photoURL: downloadURL
			});
		}
		// add the new photo to photos collection
		await firestore.add(
			{
				collection: 'users',
				doc: user.uid,
				subcollections: [ { collection: 'photos' } ]
			},
			{
				name: imageName,
				url: downloadURL
			}
		);
		dispatch(asyncActionFinish());
	} catch (error) {
		console.log(error);
		dispatch(asyncActionError());
		throw new Error('Problem uploading photo');
	}
};

export const deletePhoto = (photo) => async (
	dispatch,
	getState,
	{ getFirebase, getFirestore }
) => {
	const firebase = getFirebase();
	const firestore = getFirestore();
	const user = firebase.auth().currentUser;
	try {
		await firebase.deleteFile(
			`${user.uid}/user_images/${photo.name}`
		);
		await firestore.delete({
			collection: 'users',
			doc: user.uid,
			subcollections: [
				{ collection: 'photos', doc: photo.id }
			]
		});
	} catch (error) {
		console.log(error);
		throw new Error('Problem deleting the photo');
	}
};

export const setMainPhoto = (photo) => async (
	dispatch,
	getState,
	{ getFirebase }
) => {
	const firebase = getFirebase();
	try {
		return await firebase.updateProfile({
			photoURL: photo.url
		});
	} catch (error) {
		console.log(error);
		throw new Error('Problem setting main photo');
	}
};

// export const getProfile = () => async (
// 	dispatch,
// 	getState,
// 	{ getFirestore }
// ) => {
// 	const firestore = getFirestore();
// 	try {
// 		return await firestore.getProfile();
// 	} catch (error) {
// 		console.log(error);
// 	}
// };
