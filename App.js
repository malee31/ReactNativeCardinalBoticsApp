import { StyleSheet, Platform, StatusBar, View, Text, ScrollView } from 'react-native';
import { DrawerItems, createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator, createAppContainer } from 'react-navigation';
// import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from "react"

import Home from "./Home.js";
import NotHome from "./NotHome.js";

const Drawer = createAppContainer(createDrawerNavigator({
	Home: {screen: Home},
	NotHome: {screen: NotHome},
}, {
	contentComponent: (props) => (
		<SafeAreaView style={styles.container}>
			<View style={{height: 100,alignItems: 'center', justifyContent: 'center'}}>

				<Text style={{fontSize: 32}}>LOGO</Text>
			</View>
			<ScrollView>
				<DrawerItems {...props} />
			</ScrollView>
		</SafeAreaView>
	)
}));

export default class App extends React.Component {
	render() {
		return(
			<View style={styles.masterContainer}>
				<StatusBar style="light" />
				{/*<NavigationContainer>*/}
					<Drawer/>
				{/*</NavigationContainer>*/}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	masterContainer: {
		// marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight, //Requires
		flex: 1,
	},
	drawerHeading: {
		width: "100%",
		backgroundColor: "#FF0000",
	}
});
