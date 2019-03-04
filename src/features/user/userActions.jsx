import moment from 'moment';
import { toastr } from 'react-redux-toastr';

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
