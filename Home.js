import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from '@react-navigation/stack';
import React from "react"

const Drawer = createDrawerNavigator();

export default function Home() {
	return(
		<View>
			<Text> Hello! </Text>
			<Drawer.Navigator>
				<Drawer.Screen name="Feed" component={Feed} />
				<Drawer.Screen name="Article" component={Article} />
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
