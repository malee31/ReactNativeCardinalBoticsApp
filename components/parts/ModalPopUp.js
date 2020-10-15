import {Button, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import React from 'react';
import Styles from "./Styles.js";
import {bindActionCreators} from "redux";
import {dismissError} from "./reducerActions";
import {connect} from "react-redux";

class ModalPopUp extends React.Component {
	constructor(props) {
		super(props);
		// this.state = {
		// 	value: ''
		// };
	}

	render() {
		return this.props.errorReducer.error ? (
			<Modal isVisible={true}
				onBackdropPress={this.close}>
				<View style={Styles.content}>
					<Text style={Styles.contentTitle}>
						{this.props.errorReducer.msg || "Oh, the programmers forgot to leave a message here"}
					</Text>
					{/*<TextInput*/}
					{/*	placeholder="Your Placeholder"*/}
					{/*	onChangeText={(value) => this.setState({value})}*/}
					{/*	style={Styles.watchuDoing}*/}
					{/*	editable={true}*/}
					{/*	multiline={true}*/}
					{/*	value={this.state.value}*/}
					{/*/>*/}
					<Button onPress={this.props.dismissError} title={this.props.buttonText || "Close"}/>
				</View>
			</Modal>
		) : null;
	}
}

const stateMap = state => {
	const {errorReducer} = state;
	return {errorReducer};
};

const mapDispatchToProps = dispatch => (
	bindActionCreators({
		dismissError,
	}, dispatch)
);

export default connect(stateMap, mapDispatchToProps)(ModalPopUp);