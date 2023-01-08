import React from "react";
import { StyleSheet, View } from "react-native";
import MenuButton from "./MenuButton";
import { colors } from "../../../config.json";

const { defaultScreenStyle } = StyleSheet.create({
	defaultScreenStyle: {
		width: "100%",
		height: "100%",
		flex: 1,
		padding: "5%",
		paddingTop: 48,
		backgroundColor: colors.background,
		alignItems: "center"
	}
});

export default function Screen({ navigation, children, additionalStyles }) {
	const screenStyle = StyleSheet.compose(defaultScreenStyle, additionalStyles);
	return (
		<View style={screenStyle}>
			{navigation && <MenuButton navigation={navigation}/>}
			{children}
		</View>
	);
}