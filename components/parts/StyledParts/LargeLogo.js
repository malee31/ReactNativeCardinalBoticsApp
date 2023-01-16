import React from "react";
import { Image, StyleSheet } from "react-native";
import Logo from "../../../assets/cardinalbotics_logo_red_transparent.png";

const { logoStyle } = StyleSheet.create({
	logoStyle: {
		width: "100%",
		height: "50%",
		alignSelf: "center",
	}
})

export default function LargeLogo() {
	return (
		<Image
			resizeMode="contain"
			style={logoStyle}
			source={Logo}
		/>
	);
}