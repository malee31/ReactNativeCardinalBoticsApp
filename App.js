
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
<<<<<<< HEAD
import { StyleSheet, Text, View, TouchableHighlight, Navigator } from 'react-native';
=======
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Home from "./Home";
import NotHome from "./NotHome";
>>>>>>> 2605ac3b232ac8772fc22c5425fef0ff826b337c

const Stack = createStackNavigator();

<<<<<<< HEAD
const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Article" component={Article} />
    </Drawer.Navigator>
  );
}
=======
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
}



const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F00',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
>>>>>>> 2605ac3b232ac8772fc22c5425fef0ff826b337c
