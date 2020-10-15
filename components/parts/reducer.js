import {combineReducers} from 'redux';

const INITIAL_STATE = {
	errorMessage: "Welp, something went wrong",
	error: false
};

const errorReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "ERROR_MESSAGE":
			return Object.assign({}, state, {msg: action.msg, error: true});
			return;
		case "ERROR_DISMISS":
			return Object.assign({}, state, {error: false});
			break;
		default:
			return state;
	}
};

export default combineReducers({
	errorReducer: errorReducer
});