import {Button, Text, View} from 'react-native';
import { Modal } from "react-native-paper";
import React from 'react';
import Styles from "./Styles.js";
import useModal from "./ModalProvider";

export default function CustomModal() {
	const modal = useModal();
	const dismiss = () => modal.toggle(false);
	if(!modal.show) return null;

	return (
		<Modal
			visible={modal.show}
			animationType="slide"
			onDismiss={dismiss}
		>
			<View style={Styles.content}>
				<Text style={Styles.contentTitle}>
					{modal.message || "Oh no! The programmers forgot to leave a message here"}
				</Text>
				<Button onPress={dismiss} title="Close"/>
			</View>
		</Modal>
	);
}