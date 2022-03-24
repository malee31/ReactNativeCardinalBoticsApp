import { SafeAreaView } from 'react-native';
import { Button, Text } from 'react-native-paper';
import React, { useState } from "react";

export default function DummyProducer(text = "N/A") {
	const [status, setStatus] = useState("Initial");
	return (props) => (
		<SafeAreaView>
			<Text>{text}</Text>
			<Button onPress={() => {
				props.navigation.toggleDrawer();
				setStatus("Clicked");
			}}>
				{`Open Menu: Status - ${status}`}
			</Button>
		</SafeAreaView>
	);
};