import { Text, View} from 'react-native';
import { Button, Modal } from "react-native-paper";
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
			contentContainerStyle={{
				maxWidth: "85%",
				minHeight: "20%",
				maxHeight: "50%",
				alignSelf: "center",
				backgroundColor: 'white',
				justifyContent: 'space-between',
				alignItems: 'center',
				borderRadius: 4,
				borderColor: "#DDDDDD"
			}}
		>
			<Text style={{
				paddingVertical: 20,
				paddingHorizontal: 30,
				fontSize: 24,
				paddingBottom: 20,
				width: "100%",
				textAlign: "center"
			}}>
				{modal.message || "Oh no! The programmers forgot to leave a message here"}
			</Text>
			<Button
				mode="contained"
				onPress={dismiss}
				style={{
					width: "100%"
				}}
			>
				Close
			</Button>
		</Modal>
	);
}