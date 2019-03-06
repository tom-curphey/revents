import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {
	Card,
	Grid,
	Header,
	Image,
	Menu,
	Segment
} from 'semantic-ui-react';

import UserDetailedHeader from './UserDetailedHeader';
import UserDetailedDescription from './UserDetailedDescription';
import UserDetailedSidebar from './UserDetailedSidebar';
import UserDetailedPhotos from './UserDetailedPhotos';
import UserDetailedEvents from './UserDetailedEvents';

// Difference in years..
// Interest Array

const query = ({ auth }) => {
	return [
		{
			collection: 'users',
			doc: auth.uid,
			subcollections: [ { collection: 'photos' } ],
			storeAs: 'photos'
		}
	];
};

const mapState = (state) => ({
	profile: state.firebase.profile,
	auth: state.firebase.auth,
	loading: state.async.loading,
	photos: state.firestore.ordered.photos
});

class UserDetailedPage extends Component {
	render() {
		const { profile, photos } = this.props;
		console.log(profile);

		return (
			<Grid>
				<UserDetailedHeader profile={profile} />
				<UserDetailedDescription profile={profile} />
				<UserDetailedSidebar />
				{photos &&
				photos.length > 0 && (
					<UserDetailedPhotos photos={photos} />
				)}
				<UserDetailedEvents />
			</Grid>
		);
	}
}

export default compose(
	connect(mapState),
	firestoreConnect((auth) => query(auth))
)(UserDetailedPage);
