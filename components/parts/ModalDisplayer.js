import { StyleSheet, Text } from 'react-native';
import { Button, Modal } from "react-native-paper";
import React from 'react';
import useModal from "./ContextProviders/ModalProvider";

const modalStyles = StyleSheet.create({
	container: {
		maxWidth: "85%",
		minHeight: "15%",
		maxHeight: "50%",
		alignSelf: "center",
		backgroundColor: "white",
		justifyContent: "space-between",
		alignItems: "stretch",
		borderRadius: 4,
		borderColor: "#DDDDDD"
	},
	text: {
		paddingVertical: 10,
		paddingHorizontal: 15,
		fontSize: 24,
		textAlign: "center",
		flex: 1
	}
});

export default function CustomModal() {
	const modal = useModal();
	const dismiss = () => modal.toggle(false);
	if(!modal.show) return null;

	return (
		<Modal
			visible={modal.show}
			animationType="slide"
			onDismiss={dismiss}
			contentContainerStyle={modalStyles.container}
		>
			<Text
				style={modalStyles.text}
			>
				{modal.message || "Oh no! The programmers forgot to leave a message here"}
			</Text>
			<Button
				mode="contained"
				onPress={dismiss}
			>
				Close
			</Button>
		</Modal>
	);
}