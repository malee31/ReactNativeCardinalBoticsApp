import React from "react";

import {Provider} from 'react-redux';
import {createStore} from 'redux';
import errorReducer from './components/parts/reducer';
import Base from "./components/Base";

const store = createStore(errorReducer);

export default class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Base/>
			</Provider>
		);
	}
}