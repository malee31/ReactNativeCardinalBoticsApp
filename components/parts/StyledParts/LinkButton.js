import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { openBrowserAsync } from "expo-web-browser";
import config from "../../../config.json";

const colors = config.colors;

// Images and icon names from https://materialdesignicons.com/
// Newer Alternative: https://pictogrammers.com/library/mdi/
const iconStringMap = {
	"googledrive": "folder-account",
	"roster": "clipboard-account",
	"calendar": "calendar",
	"forms": "format-list-bulleted-square",
	"website": "web",
	"photo": "image",
	"youtube": "youtube-tv",
	"training": "human-male-board",
	"grant": "currency-usd",
	"money": "currency-usd",
	"irc": "book",
	"handbook": "book",
	"default": "cogs"
};

const linkButtonStyles = StyleSheet.create({
	wrapper: {
		width: "100%",
		minHeight: 40,
		marginVertical: 2,
	},
	linkText: {
		width: "100%",
		textAlign: "left"
	}
});

export default function LinkButton({ icon = "", title, url }) {
	const iconString = iconStringMap[icon.toLowerCase().trim()] || iconStringMap["default"];
	return (
		<View style={linkButtonStyles.wrapper}>
			<Button
				icon={iconString}
				mode="contained"
				buttonColor={colors.secondary}
				onPress={() => openBrowserAsync(url)}
				key={title || `Resource: ${url}<${icon}>`}
				labelStyle={linkButtonStyles.linkText}
			>
				{title || "Resource"}
			</Button>
		</View>
	);
}