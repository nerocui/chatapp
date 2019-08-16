import { SET_CONTACTS } from '../action/type';

const initialState = {
	contacts: [],
};

export default function(state = initialState, action) {
	switch(action.type) {
		case SET_CONTACTS:
			return Object.assign({}, state, {contacts: action.payload});
		default:
			return state;
	}
}
