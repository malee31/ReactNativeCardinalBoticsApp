import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createAppContainer} from 'react-navigation';
import {StatusBar} from 'expo-status-bar';
import React from "react";

import config from "./config.json";
import Home from "./components/Home.js";
import Resources from "./components/Resources.js";
import Forms from "./components/Forms.js";
import Calendar from "./components/CalendarFragment.js";
import Login from "./components/Login.js";

import HomeIcon from "./images/home.svg";
import LoginIcon from "./images/login.svg";
import CalendarIcon from "./images/calendar.svg";
import ResourcesIcon from "./images/list.svg";
import FormsIcon from "./images/form.svg";

const drawerTheme = {
	...DefaultTheme,
	roundness: 2,
	colors: {
		...DefaultTheme.colors,
		primary: config.colors.primary,
		accent: config.colors.cardinalWhite
	},
};

const Drawer = createAppContainer(createDrawerNavigator({
	Home: {
		screen: props => (<Home login={props.screenProps.login} logout={props.screenProps.logout}/>),
		navigationOptions: {
			drawerLabel: 'Home',
			drawerIcon: () => (
				<HomeIcon
					width={30}
					height={30}
					fill={config.colors.secondary}
				/>
			)
		}
	},
	Login: {
		screen: props => (<Login setData={props.screenProps.setData}/>),
		navigationOptions: {
			drawerLabel: 'Login',
			drawerIcon: () => (
				<LoginIcon
					width={30}
					height={30}
					fill={config.colors.secondary}
				/>
			)
		}
	},
	Calendar: {
		screen: Calendar,
		navigationOptions: {
			drawerLabel: 'Calendar',
			drawerIcon: () => (
				<CalendarIcon
					width={30}
					height={30}
					fill={config.colors.secondary}
				/>
			)
		}
	},
	Resources: {
		screen: Resources,
		navigationOptions: {
			drawerLabel: 'Resources',
			drawerIcon: () => (
				<ResourcesIcon
					width={30}
					height={30}
					fill={config.colors.secondary}
				/>
			)
		}
	},
	Forms: {
		screen: Forms,
		navigationOptions: {
			drawerLabel: 'Forms',
			drawerIcon: () => (
				<FormsIcon
					width={30}
					height={30}
					fill={config.colors.secondary}
				/>
			)
		}
	},
}, {
	contentComponent: (props) => (
		<SafeAreaView style={styles.masterContainer}>
			<View style={styles.drawerHeading}>
				<Image source={require("./assets/cardinalbotics_logo_white_clear.png")}
					resizeMode="contain"
					style={styles.drawerLogo}/>
				<Text style={styles.drawerText}>{props.screenProps.displayText ? `Logged in as ${props.screenProps.displayText}` : "Not Logged In"}</Text>
			</View>
			<ScrollView>
				<DrawerItems {...props} />
			</ScrollView>
		</SafeAreaView>
	)
}));

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			password: ""
		}
		this.setData = this.setData.bind(this);
		this.getData = this.getData.bind(this);
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);

		this.getData("password", value => {
			this.setState({password: value});
		}, err => {
			console.warn("No password found in memory.");
			console.log(err)
		});
	}

	setData(key, value, onSuccess, onFail) {
		if (!key || !value) {
			console.warn("Uh oh. Invalid key or value to save");
			return;
		}
		onSuccess = typeof onSuccess == "function" ? onSuccess : () => {
			console.log(`SUCCESSFULLY SAVED ${value} as ${key}`)
		};
		onFail = typeof onFail == "function" ? onFail : () => {
			console.log(`Failed to save ${value} as ${key} :(`)
		};

		let onSuccessAndReset = value => {
			onSuccess(value);
			this.getData("password", value => {
				this.setState({password: value});
			}, err => {
				console.warn("No password found in memory.");
				console.log(err)
			});
		};
		AsyncStorage.setItem(key, typeof value == "string" ? value : JSON.stringify(value)).then(onSuccessAndReset).catch(onFail);
	}

	getData(key, onSuccess, onFail) {
		if (typeof key !== "string") {
			console.warn("Uh oh. Invalid key or value to save");
			return;
		}
		onSuccess = typeof onSuccess == "function" ? onSuccess : value => {
			console.log(`SUCCESSFULLY GOT ${value} from ${key}... and did nothing with it`)
		};
		onFail = typeof onFail == "function" ? onFail : () => {
			console.log(`Failed to get ${key} :(`)
		};

		AsyncStorage.getItem(key).then(onSuccess).catch(onFail);
	}

	login(onSuccess, onFail) {
		let url = `${config.serverEndpointBaseURLs.login}?password=${encodeURI(this.state.password)}`;
		onSuccess = typeof onSuccess == "function" ? onSuccess : () => {
			console.log(`SUCCESSFULLY LOGGED IN AS ${this.state.password}`)
		};
		onFail = typeof onFail == "function" ? onFail : () => {
			console.log(`Failed to log in as ${this.state.password} :(`)
		};
		fetch(url).then(onSuccess).catch(onFail);
	}

	logout(whatDid, onSuccess, onFail) {
		let url = `${config.serverEndpointBaseURLs.logout}?password=${encodeURI(this.state.password)}&did=${encodeURI(whatDid)}`;
		onSuccess = typeof onSuccess == "function" ? onSuccess : () => {
			console.log(`SUCCESSFUL LOGOUT WITH ${this.state.password} WITH DETAILS: ${whatDid}`);
		};
		onFail = typeof onFail == "function" ? onFail : () => {
			console.log(`Failed to logout with ${this.state.password} and details: ${whatDid} :(`);
		};
		fetch(url).then(onSuccess).catch(onFail);
	}

	render() {
		return (
			<PaperProvider theme={drawerTheme} style={styles.masterContainer}>
				<StatusBar animated backgroundColor="#7D1120" style="dark"/>
				{/*<NavigationContainer>*/}
				<Drawer screenProps={{
					displayText: this.state.password,
					getData: this.getData,
					setData: this.setData,
					login: this.login,
					logout: this.logout,
					testText: "Testing complete?"
				}}/>
				{/*</NavigationContainer>*/}
			</PaperProvider>
		);
	}
}

const styles = StyleSheet.create({
	masterContainer: {
		// marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
		flex: 1,
	},
	drawerHeading: {
		width: "100%",
		height: "25%",
		alignItems: 'center',
		justifyContent: 'flex-start'
	},
	drawerLogo: {
		width: "60%",
		height: "70%",
		maxHeight: "70%",
	},
	drawerText: {
		width: "100%",
		height: "30%",
		fontSize: 18,
		color: "#888",
		textAlign: "center",
	}
});