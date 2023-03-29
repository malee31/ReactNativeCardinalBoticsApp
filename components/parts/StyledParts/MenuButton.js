import React from "react";
import { StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import config from "../../../config.json";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const colors = config.colors;

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

export default function MenuButton() {
	const navigation = useNavigation();
	const insets = useSafeAreaInsets();

	return (
		<IconButton
			accessibilityLabel="Menu"
			icon="menu"
			size={44}
			color={colors.secondary}
			style={[menuButtonStyle, { marginTop: insets.top }]}
			onPress={navigation.toggleDrawer}
		/>
	);
}