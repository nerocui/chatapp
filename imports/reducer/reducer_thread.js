import { SET_THREADS } from '../action/type';

const initialState = {
	threads: [],
};

export default function(state = initialState, action) {
	switch(action.type) {
		case SET_THREADS:
			return Object.assign({}, state, {threads: action.payload});
		default:
			return state;
	}
}
