import { toastr } from 'react-redux-toastr';
import {
	CREATE_EVENT,
	DELETE_EVENT,
	UPDATE_EVENT,
	FETCH_EVENTS
} from './eventConstants';
import {
	asyncActionStart,
	asyncActionFinish,
	asyncActionError
} from '../async/asyncAction';
import { fetchSampleData } from '../../app/data/mockApi';

export const fetchEvents = (events) => {
	return {
		type: FETCH_EVENTS,
		payload: events
	};
};

export const createEvent = (event) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: CREATE_EVENT,
				payload: {
					event
				}
			});
			toastr.success('Success!', 'Event has been created');
		} catch (error) {
			toastr.error('Opps', 'Computer says no..');
		}
	};
};

export const updateEvent = (event) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: UPDATE_EVENT,
				payload: {
					event
				}
			});
			toastr.success(
				'Success!',
				'Event was updated successfully'
			);
		} catch (error) {
			toastr.error('Opps', 'Computer says no..');
		}
	};
};

export const deleteEvent = (eventId) => {
	return {
		type: DELETE_EVENT,
		payload: {
			eventId
		}
	};
};

export const loadEvents = () => {
	return async (dispatch) => {
		try {
			dispatch(asyncActionStart());
			// Gets the sample data and adds it to the events variable
			let events = await fetchSampleData();
			// 'dispatch' calls an action to start a chain of events
			// We will pass events as the payload to the reducer
			dispatch(fetchEvents(events));
			dispatch(asyncActionFinish());
		} catch (error) {
			console.log(error);
			dispatch(asyncActionError());
		}
	};
};
