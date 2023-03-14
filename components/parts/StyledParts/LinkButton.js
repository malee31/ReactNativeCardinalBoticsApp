import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import * as WebBrowser from "expo-web-browser";
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

const { linkButtonStyle } = StyleSheet.create({
	linkButtonStyle: {
		width: "100%",
		minHeight: 40,
		flex: 1,
		justifyContent: "center",
		alignItems: "flex-start",
		marginVertical: 2
	}
});

export default function LinkButton({ icon = "", title, url }) {
	const iconString = iconStringMap[icon.toLowerCase().trim()] || iconStringMap["default"];
	return (
		<Button
			icon={iconString}
			mode="contained"
			color={colors.secondary}
			onPress={() => WebBrowser.openBrowserAsync(url)}
			key={title || "Resource" + ": " + url + "<" + icon + ">"}
			style={linkButtonStyle}
		>
			{title || "Resource"}
		</Button>
	);
}