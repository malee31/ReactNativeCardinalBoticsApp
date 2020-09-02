import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {StatusBar} from 'expo-status-bar';
import React from "react";

import ModalPopUp from "./components/parts/ModalPopUp.js";
import Drawer from "./components/parts/Drawer.js";
import config from "./config.json";

const drawerTheme = {
	...DefaultTheme,
	roundness: 2,
	colors: {
		...DefaultTheme.colors,
		primary: config.colors.primary,
		accent: config.colors.cardinalWhite
	},
};

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			password: "",
			user: "",
			error: false,
			errorText: ""
		}
		this.setPassword = this.setPassword.bind(this);
		this.getPassword = this.getPassword.bind(this);
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);

		this.getPassword(value => {
			this.setState({password: value});
		}, err => {
			this.setState({
				error: true,
				errorMessage: "No password found in memory. Go to the Login page to log in!"
			});
		});
	}

	setData(key, value, onSuccess, onFail) {
		if (!key || !value) {
			this.setState({
				error: true,
				errorMessage: "Uh oh. Invalid key or value to save"
			});
			return;
		}

		AsyncStorage.setItem(key, typeof value == "string" ? value : JSON.stringify(value)).then(onSuccess).catch(onFail);
	}

	getData(key, onSuccess, onFail) {
		if (typeof key !== "string") {
			console.warn("Uh oh. Invalid key or value to save");
			return;
		}

		AsyncStorage.getItem(key).then(onSuccess).catch(onFail);
	}

	//Pretty much only for Login.js
	setPassword(value, onSuccess, onFail, user) {
		this.setData("password", value, () => {
			onSuccess();
			this.getPassword(value => {
				if (user) {
					this.setState({
						user: user,
						password: value
					});
				} else {
					this.setState({
						password: value
					});
				}
			}, err => {
				this.setState({
					error: true,
					errorMessage: "Failed to update password"
				});
			});
		}, onFail);
	}

	getPassword(onSuccess, onFail) {
		this.getData("password", val => {
			onSuccess(val);
			this.setState({
				password: val
			})
		}, onFail);
	}

	login(onSuccess, onFail) {
		let url = `${config.serverEndpointBaseURLs.login}?password=${encodeURI(this.state.password)}`;
		fetch(url).then(onSuccess).catch(onFail);
	}

	logout(whatDid, onSuccess, onFail) {
		let url = `${config.serverEndpointBaseURLs.logout}?password=${encodeURI(this.state.password)}&did=${encodeURI(whatDid)}`;
		fetch(url).then(onSuccess).catch(onFail);
	}

	render() {
		return (
			<PaperProvider theme={drawerTheme} style={styles.masterContainer}>
				<StatusBar animated backgroundColor="#7D1120" style="dark"/>
				{/*<NavigationContainer>*/}
				<Drawer screenProps={{
					userText: this.state.user,
					getData: this.getData,
					setData: this.setData,
					getPassword: this.getPassword,
					setPassword: this.setPassword,
					login: this.login,
					logout: this.logout,
					testText: "Testing complete?"
				}}/>
				<ModalPopUp show={() => {
					return this.state.error
				}} text={() => {
					return this.state.errorMessage
				}}
					onPress={() => {
						this.setState({error: false})
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