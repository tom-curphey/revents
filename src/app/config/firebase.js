import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyBUYmwglL5KwyR-XMr1oqh22cT-FQenDs4',
	authDomain: 'revents-c463e.firebaseapp.com',
	databaseURL: 'https://revents-c463e.firebaseio.com',
	projectId: 'revents-c463e',
	storageBucket: 'revents-c463e.appspot.com',
	messagingSenderId: '928302865208'
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = {
	timestampsInSnapshots: true
};
firestore.settings(settings);

export default firebase;
