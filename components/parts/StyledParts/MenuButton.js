import React from "react";
import { StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { colors } from "../../../config.json";

const { menuButtonStyle } = StyleSheet.create({
	menuButtonStyle: {
		position: "absolute",
		top: 0,
		left: 0,
		width: 36,
		height: 36,
		borderRadius: 0,
		borderBottomRightRadius: 4,
		zIndex: 1
	}
});

export default function MenuButton({ navigation }) {
	return (
		<IconButton
			accessibilityLabel="Menu"
			icon="menu"
			size={32}
			color={colors.secondary}
			style={menuButtonStyle}
			onPress={navigation.toggleDrawer}
		/>
	);
}