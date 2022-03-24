import {Button, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import React from 'react';
import Styles from "./Styles.js";

export default function CustomModal(props) {
	if(!props.show) return null;

	return (
		<Modal isVisible={props.show}
			onBackdropPress={props.dismiss}>
			<View style={Styles.content}>
				<Text style={Styles.contentTitle}>
					{props.message || "Oh, the programmers forgot to leave a message here"}
				</Text>
				<Button onPress={props.dismiss} title={props.buttonText || "Close"}/>
			</View>
		</Modal>
	);
}