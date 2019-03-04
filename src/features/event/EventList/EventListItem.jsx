import React, { Component } from 'react';
import { Segment, Item, Icon, Button, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import EventListAttendee from './EventListAttendee';
import format from 'date-fns/format';

class EventListItem extends Component {
	render() {
		const { event, deleteEvent } = this.props;
		return (
			<Segment.Group>
				<Segment>
					<Item.Group>
						<Item>
							<Item.Image
								size="tiny"
								circular
								src={event.hostPhotoURL}
							/>
							<Item.Content>
								<Item.Header as="a">
									{event.title}
								</Item.Header>
								<Item.Description>
									Hosted by <a>{event.hostedBy}</a>
								</Item.Description>
							</Item.Content>
						</Item>
					</Item.Group>
				</Segment>
				<Segment>
					<span>
						<Icon name="clock" />{' '}
						{format(
							event.date.toDate(),
							'dddd Do MMMM'
						)}{' '}
						at {format(event.date.toDate(), 'HH:mm')} |
						<Icon name="marker" /> {event.venue}
					</span>
				</Segment>
				<Segment secondary>
					<List horizontal>
						{event.attendees &&
							// Object.values() -> Takes an object as a parameter and returns
							// its values as an array so we can map through the array.
							// A map function will only take an array as a parameter
							// Add index as a parameter so you can make pass the index as the key -> This is a temporary shortcut
							Object.values(
								event.attendees
							).map((attendee, index) => (
								<EventListAttendee
									key={index}
									attendee={attendee}
								/>
							))}
					</List>
				</Segment>
				<Segment clearing>
					<span>{event.description}</span>
					<Button
						onClick={deleteEvent(event.id)}
						as="a"
						color="red"
						floated="right"
						content="Delete"
					/>
					<Button
						as={Link}
						to={`/event/${event.id}`}
						color="teal"
						floated="right"
						content="View"
					/>
				</Segment>
			</Segment.Group>
		);
	}
}

export default EventListItem;
