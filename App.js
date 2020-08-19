import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Navigator } from 'react-native';

const routes = [
	{title: "Home", index: 0},
	{title: "Not Home", index: 1}
];

export default function App() {
  return (
    <Navigator
		initialRoute={routes[0]}
		initialRouteStack={routes}
		renderScene={(route, navigator) =>
			<TouchableHighlight onPress={() => {
				if(route.index == 0) {
					navigator.push(routes[1]);
				} else {
					navigator.pop();
				}
			}}>
			<Text> Hello {route.title}! </Text>
			</TouchableHighlight>
			}
		style={styles.container}/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
