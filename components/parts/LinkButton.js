import React from "react";
import * as WebBrowser from 'expo-web-browser';
import config from "../../config.json";
import {Button} from 'react-native-paper';
import {Text} from "react-native";

export default function LinkButton(props) {
	let icon;
	//Images from https://materialdesignicons.com/
	switch (props.icon?.toLowerCase().trim()) {
		case "googledrive":
			icon = "google-drive";
			break;
		case "roster":
			icon = "clipboard-account";
			break;
		case "calendar":
			icon = "calendar";
			break;
		case "forms":
			icon = "format-list-bulleted-square";
			break;
		case "website":
			icon = "web";
			break;
		case "photo":
			icon = "google-photos";
			break;
		case "youtube":
			icon = "youtube-tv";
			break;
		case "training":
			icon = "teach";
			break;
		case "grant":
		case "money":
			icon = "currency-usd";
			break;
		case "irc":
		case "handbook":
			icon = "book";
			break;
		default:
			icon = "cogs";
	}
	return (
		<Button
			icon={icon}
			mode="contained"
			color={config.colors.secondary}
			onPress={async () => {
				await WebBrowser.openBrowserAsync(props.url);
			}}
			key={props.title || "Resource" + ": " + props.url + "<" + icon + ">"}
			style={props.style || {}}>
			<Text style={{textAlign: "left", width: "100%"}}>{props.title || "Resource"}</Text>
		</Button>
	);
}