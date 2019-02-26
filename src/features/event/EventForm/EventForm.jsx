import React, { Component } from 'react';
import { connect } from 'react-redux';
import cuid from 'cuid';
import { Segment, Form, Button } from 'semantic-ui-react';
import { createEvent, updateEvent } from '../eventActions';
import { IPv4 } from 'ipaddr.js';

const mapState = (state, ownProps) => {
	const eventId = ownProps.match.params.id;

	let event = {
		title: '',
		date: '',
		city: '',
		venue: '',
		hostedBy: ''
	};

	if (eventId && state.events.length > 0) {
		event = state.events.filter(
			(event) => event.id === eventId
		)[0];
	}

	return {
		event
	};
};

const actions = {
	createEvent,
	updateEvent
};

class EventForm extends Component {
	state = {
		event: Object.assign({}, this.props.event)
	};

	// componentDidMount() {
	// 	if (this.props.selectedEvent !== null) {
	// 		this.setState({
	// 			event: this.props.selectedEvent
	// 		});
	// 	}
	// }

	// componentWillReceiveProps(nextProps) {
	// 	// console.log('Current', this.props.selectedEvent);
	// 	// console.log('Next', nextProps.selectedEvent);

	// 	if (nextProps.selectedEvent !== this.props.selectedEvent) {
	// 		this.setState({
	// 			// Id there isn't a selected event then pass in the empty event object
	// 			event: nextProps.selectedEvent || emptyEvent
	// 		});
	// 	}
	// }

	onInputChange = (e) => {
		const newEvent = this.state.event;
		newEvent[e.target.name] = e.target.value;
		this.setState({ event: newEvent });
	};

	onFormSubmit = (e) => {
		e.preventDefault();
		// console.log(this.state.event);
		if (this.state.event.id) {
			this.props.updateEvent(this.state.event);
			this.props.history.goBack();
		} else {
			const newEvent = {
				...this.state.event,
				id: cuid(),
				hostPhotoURL: '/assets/user.png'
			};
			this.props.createEvent(newEvent);
			this.props.history.push('/events');
		}
	};

	render() {
		const { handleCancel } = this.props;
		const { event } = this.state;
		return (
			<Segment>
				<Form onSubmit={this.onFormSubmit}>
					<Form.Field>
						<label>Event Title</label>
						<input
							placeholder="Event Title"
							name="title"
							value={event.title}
							onChange={this.onInputChange}
						/>
					</Form.Field>
					<Form.Field>
						<label>Event Date</label>
						<input
							type="date"
							placeholder="Event Date"
							name="date"
							value={event.date}
							onChange={this.onInputChange}
						/>
					</Form.Field>
					<Form.Field>
						<label>City</label>
						<input
							placeholder="City event is taking place"
							name="city"
							value={event.city}
							onChange={this.onInputChange}
						/>
					</Form.Field>
					<Form.Field>
						<label>Venue</label>
						<input
							placeholder="Enter the Venue of the event"
							name="venue"
							value={event.venue}
							onChange={this.onInputChange}
						/>
					</Form.Field>
					<Form.Field>
						<label>Hosted By</label>
						<input
							placeholder="Enter the name of person hosting"
							name="hostedBy"
							value={event.hostedBy}
							onChange={this.onInputChange}
						/>
					</Form.Field>
					<Button positive type="submit">
						Submit
					</Button>
					<Button
						onClick={this.props.history.goBack}
						type="button"
					>
						Cancel
					</Button>
				</Form>
			</Segment>
		);
	}
}

export default connect(mapState, actions)(EventForm);
