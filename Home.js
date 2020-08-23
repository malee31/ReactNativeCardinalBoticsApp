import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from "react"

import NotHome from "./NotHome";

const Drawer = createDrawerNavigator();

export default function Home() {
	return(
		<View>
			<Text> Hello! </Text>
			<Drawer.Navigator>
				<Drawer.Screen name="NotHome" component={NotHome} />
			</Drawer.Navigator>
		</View>
	);
}

/*export default class Home extends React.Fragment {
	render() {
		return(
			<View>
				<Text> Hello! </Text>
			</View>
		);
	}
}*/
