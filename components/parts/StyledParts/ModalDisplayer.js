import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Modal } from "react-native-paper";
import useModal from "../ContextProviders/ModalProvider";
import { colors } from "../../../config.json";

const modalStyles = StyleSheet.create({
	container: {
		width: "90%",
		maxWidth: 600,
		height: 172,
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
	},
	dismissButton: {
		justifySelf: "flex-end",
		borderRadius: 0,
		borderBottomLeftRadius: 4,
		borderBottomRightRadius: 4
	},
	dismissButtonLabel: {
		paddingVertical: 2,
		width: "100%",
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
					// contentContainerStyle={modalStyles.textContainerContent}
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
				style={modalStyles.dismissButton}
				labelStyle={modalStyles.dismissButtonLabel}
			>
				Close
			</Button>
		</Modal>
	);
}