import React from "react";
import { StyleSheet } from "react-native";
import { colors } from "../../../config.json";
import { Button } from 'react-native-paper';

const { menuButtonStyle } = StyleSheet.create({
	menuButtonStyle: {
		position: "absolute",
		top: 0,
		left: 0,
		borderTopLeftRadius: 0,
		borderTopRightRadius: 0,
		borderBottomLeftRadius: 0,
		zIndex: 1
	}
})

export default function MenuButton({ navigation }) {
	return (
		<Button
			icon="menu"
			mode="contained"
			color={colors.secondary}
			style={menuButtonStyle}
			onPress={navigation.toggleDrawer}
		>
			Menu
		</Button>
	);
}