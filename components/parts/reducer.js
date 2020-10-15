import {combineReducers} from 'redux';

const INITIAL_STATE = {
	current: 0,
	possible: [
		'Alice',
		'Bob',
		'Sammy'
	],
};

const reducer1 = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "UPDATE_SESSIONS":
			console.log("REDUX UPDATE SESSIONS");
			let newState = Object.assign({}, state, {current: Math.floor(Math.random() * 3)});
			console.log(newState);

			return newState;
		break;
		default:
			console.log("REDUX DEFAULT");
			return state;
	}
};

export default combineReducers({
	reducer1: reducer1
});