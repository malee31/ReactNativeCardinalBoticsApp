import { StyleSheet, Text, View, Button } from 'react-native';
import LinkButton from "./LinkButton.js";
import React from "react"

export default class NotHome extends React.Component {
	render() {
		return(
			<View>
				<LinkButton title="Click Me" url="https://google.com" />
				<LinkButton title="Click Me 2" url="https://youtube.com" />
			</View>
		);
	}
}