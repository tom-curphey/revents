import { MODAL_OPEN, MODAL_CLOSE } from './modalConstants';
import { createReducer } from '../../app/common/util/reducerUtil';

const initialState = null;

// The functions below set the initial state to be
// passed to the store to update the components

export const openModal = (state, payload) => {
	const { modalType, modalProps } = payload;
	return { modalType, modalProps };
};

export const closeModal = (state, payload) => {
	return null;
};

export default createReducer(initialState, {
	[MODAL_OPEN]: openModal,
	[MODAL_CLOSE]: closeModal
});
