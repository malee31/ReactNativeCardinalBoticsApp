import * as WebBrowser from 'expo-web-browser';
import React from "react"
import config from "../../config.json";
import {Button} from 'react-native-paper';
import {Text} from "react-native";

export default class LinkButton extends React.Component {
	constructor(props) {
		super(props);
		this.openURL = this.openURL.bind(this);
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
			default:
				icon = "cogs";
		}

		this.state = {
			url: props.url,
			title: props.title || "Resource",
			icon: icon,
			style: props.style || {}
		};
	}

	openURL = async () => {
		await WebBrowser.openBrowserAsync(this.state.url);
	}

	render() {
		return (
			<Button
				icon={this.state.icon}
				mode="contained"
				color={config.colors.secondary}
				onPress={this.openURL}
				key={this.state.title + ": " + this.state.url + "<" + this.state.icon + ">"}
				style={this.state.style}>
				<Text style={{textAlign: "left"}}>{this.state.title}</Text>
			</Button>
		);
	}
}