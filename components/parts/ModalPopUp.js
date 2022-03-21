import {Button, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import React from 'react';
import Styles from "./Styles.js";

export default function CustomModal(props) {
	return props.error ? (
		<Modal isVisible={true}
			onBackdropPress={this.close}>
			<View style={Styles.content}>
				<Text style={Styles.contentTitle}>
					{props.message || "Oh, the programmers forgot to leave a message here"}
				</Text>
				<Button onPress={props.dismissError} title={props.buttonText || "Close"}/>
			</View>
		</Modal>
	) : null;
}