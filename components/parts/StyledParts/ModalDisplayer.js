import React from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { Button, Modal } from "react-native-paper";
import useModal from "../ContextProviders/ModalProvider";

const modalStyles = StyleSheet.create({
	container: {
		width: "90%",
		maxWidth: 600,
		height: 160,
		maxHeight: "50%",
		padding: 0,
		alignSelf: "center",
		justifyContent: "space-between",
		alignItems: "stretch",
		backgroundColor: "white",
		borderRadius: 4
	},
	scrollContainer: {
		marginBottom: 8,
		justifyContent: "center",
		flex: 1
	},
	textContainer: {
		paddingHorizontal: 16,
		paddingVertical: 12,
		flexGrow: 0
	},
	text: {
		textAlign: "center",
		fontSize: 24
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
			<View style={modalStyles.scrollContainer}>
				<ScrollView
					style={modalStyles.textContainer}
					contentContainerStyle={modalStyles.textContainerContent}
					bounces={false}
					pinchGestureEnabled={false}
				>
					<Text
						style={modalStyles.text}
					>
						{modal.message || "Oh no! The programmers forgot to leave a message here"}
					</Text>
				</ScrollView>
			</View>

			<Button
				mode="contained"
				onPress={dismiss}
				style={{ justifySelf: "flex-end" }}
			>
				Close
			</Button>
		</Modal>
	);
}