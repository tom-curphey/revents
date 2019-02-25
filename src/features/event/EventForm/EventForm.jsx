import React, { Component } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';

const emptyEvent = {
	title: '',
	date: '',
	city: '',
	venue: '',
	hostedBy: ''
};

class EventForm extends Component {
	state = {
		event: emptyEvent
	};

	componentDidMount() {
		if (this.props.selectedEvent !== null) {
			this.setState({
				event: this.props.selectedEvent
			});
		}
	}

	componentWillReceiveProps(nextProps) {
		// console.log('Current', this.props.selectedEvent);
		// console.log('Next', nextProps.selectedEvent);

		if (nextProps.selectedEvent !== this.props.selectedEvent) {
			this.setState({
				// Id there isn't a selected event then pass in the empty event object
				event: nextProps.selectedEvent || emptyEvent
			});
		}
	}

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
		} else {
			this.props.createEvent(this.state.event);
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
					<Button onClick={handleCancel} type="button">
						Cancel
					</Button>
				</Form>
			</Segment>
		);
	}
}

export default EventForm;
