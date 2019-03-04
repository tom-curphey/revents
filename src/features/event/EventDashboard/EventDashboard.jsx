import React, { Component } from 'react';
import { connect } from 'react-redux';
// 'react-redux-firebase' gives us the binding actions to connect to firestore
import { firestoreConnect } from 'react-redux-firebase';
import { Grid } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import { deleteEvent } from '../eventActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import EventActivity from '../../event/EventActivity/EventActivity';

const mapState = (state) => ({
	events: state.firestore.ordered.events,
	// events: state.events,
	loading: state.async.loading
});

const actions = {
	deleteEvent
};

class EventDashboard extends Component {
	handleDeleteEvent = (eventId) => () => {
		this.props.deleteEvent(eventId);
	};

	render() {
		const { events, loading } = this.props;
		if (loading) return <LoadingComponent inverted={true} />;
		return (
			<Grid>
				<Grid.Column width={10}>
					<EventList
						deleteEvent={this.handleDeleteEvent}
						events={events}
					/>
				</Grid.Column>
				<Grid.Column width={6}>
					<EventActivity />
				</Grid.Column>
			</Grid>
		);
	}
}

export default connect(mapState, actions)(
	// firestoreConnect takes our request for events and the event Dashboards
	// returning a new component with firestore connected allowing us to listen to events!
	// We aren't getting events
	firestoreConnect([ { collection: 'events' } ])(EventDashboard)
);
