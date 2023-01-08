import React from "react";
import { StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { colors } from "../../../config.json";

const { menuButtonStyle } = StyleSheet.create({
	menuButtonStyle: {
		position: "absolute",
		top: 0,
		left: 0,
		width: 48,
		height: 48,
		borderRadius: 0,
		borderBottomRightRadius: 4,
		zIndex: 1,
		// backgroundColor: "red",
		margin: 0,
		padding: 4,
	}
});

export default function MenuButton({ navigation }) {
	return (
		<IconButton
			accessibilityLabel="Menu"
			icon="menu"
			size={44}
			color={colors.secondary}
			style={menuButtonStyle}
			onPress={navigation.toggleDrawer}
		/>
	);
}