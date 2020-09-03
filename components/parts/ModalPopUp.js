import {Button, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import React from 'react';
import Styles from "./Styles.js";

class ModalPopUp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			onPress: props.onPress,
			show: props.show,
			text: props.text,
			buttonText: props.buttonText,
			value: ''
		};
	}

	render() {
		return (
			<Modal isVisible={this.state.show()}
				onBackdropPress={this.close}>
				<View style={Styles.content}>
					<Text style={Styles.contentTitle}>
						{typeof this.state.text == "function" ? this.state.text() : this.state.text || "Oh, the programmers forgot to leave a message here"}
					</Text>
					{/*<TextInput*/}
					{/*	placeholder="Your Placeholder"*/}
					{/*	onChangeText={(value) => this.setState({value})}*/}
					{/*	style={Styles.watchuDoing}*/}
					{/*	editable={true}*/}
					{/*	multiline={true}*/}
					{/*	value={this.state.value}*/}
					{/*/>*/}
					<Button onPress={this.state.onPress} title={this.state.buttonText || "Close"}/>
				</View>
			</Modal>
		);
	}
}

export default ModalPopUp;