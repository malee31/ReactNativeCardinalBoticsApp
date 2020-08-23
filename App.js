import { StyleSheet, Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from "react"

import Home from "./Home.js";
import NotHome from "./NotHome.js";

const Drawer = createDrawerNavigator();

export default function App() {
	console.log(StatusBar.currentHeight)
	return(
		<NavigationContainer
			style={styles.container}>
			<Drawer.Navigator
				style={{
					paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
				}}>
				<Drawer.Screen name="Home" component={Home} />
				<Drawer.Screen name="NotHome" component={NotHome} />
			</Drawer.Navigator>
		</NavigationContainer>
	);
}
/*import { StyleSheet, Text, View, TouchableHighlight, Navigator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import * as React from 'react';

import Home from "./Home";
import NotHome from "./NotHome";

const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer style={styles.container}>
			<Stack.Navigator>
				<Stack.Screen
					name="Home"
					component={Home}
					options={{ title: 'Welcome' }}
				/>
				<Stack.Screen
					name="NotHome"
					component={NotHome}
					options={{ title: 'Welcome II' }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}*/

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#F00',
		paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});
