import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import {SafeAreaProvider} from "react-native-safe-area-context";
import {StatusBar} from 'expo-status-bar';
import React from "react";

import ModalPopUp from "./components/parts/ModalPopUp.js";
import Drawer from "./components/parts/Drawer.js";
import config from "./config.json";

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: "",
			password: "",
			signedIn: false,
			timeIn: 0,
			timer: null,
			error: false,
			errorText: ""
		}
		this.setPassword = this.setPassword.bind(this);
		this.getPassword = this.getPassword.bind(this);
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
		this.setSignInStatus = this.setSignInStatus.bind(this);
	}

	componentDidMount() {
		this.getPassword(value => {
			console.log(`Password: ${value}`);
			if (value) this.setState({password: value});


			let url = config.serverEndpointBaseURLs.getUserData + encodeURI(`?password=${value}`);
			fetch(url)
				.then(res => res.json())
				.then((json) => {
					this.setState({user: json.username});
				}).catch(err => {
				this.setState({
					error: true,
					errorMessage: `Error: Looks like either you don't exist or the server behaved unexpectedly\n\n${JSON.stringify(err)}`
				});
			});
		}, () => {
			this.setState({
				error: true,
				errorMessage: "No password found in memory. Go to the Login page to log in!"
			});
		});
	}

	setSignInStatus(status) {
		this.setState({
			signedIn: status
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
		if (this.state.signedIn) {
			this.setState({
				error: true,
				errorMessage: "Can't log into another account while signed in!"
			});
			return;
		}

		this.setData("password", value, () => {
			if (typeof onSuccess == "function") onSuccess();
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
					errorMessage: `Failed to update password\n${JSON.stringify(err)}`
				});
			});
		}, onFail);
	}

	getPassword(onSuccess, onFail) {
		this.getData("password", val => {
			onSuccess(val);
			if (val) {
				this.setState({
					password: val
				});
			}
		}, onFail);
	}

	login(onSuccess, onFail) {
		if (this.state.password === "") {
			this.setState({
				error: true,
				errorMessage: "You're not logged in!"
			})
			return;
		}
		let url = `${config.serverEndpointBaseURLs.login}?password=${encodeURI(this.state.password)}`;
		fetch(url).then(onSuccess).catch(onFail);
	}

	logout(whatDid, onSuccess, onFail) {
		let url = `${config.serverEndpointBaseURLs.logout}?password=${encodeURI(this.state.password)}&did=${encodeURI(whatDid)}`;
		fetch(url).then(onSuccess).catch(onFail);
	}

	render() {
		return (
			<SafeAreaProvider>
				<PaperProvider theme={{
					...DefaultTheme,
					roundness: 2,
					colors: {
						...DefaultTheme.colors,
						primary: config.colors.primary,
						accent: config.colors.cardinalWhite
					},
				}} style={{flex: 1}}>
					<StatusBar animated hidden style="dark"/>
					<Drawer screenProps={{
						userText: this.state.user,
						timeIn: this.state.timeIn,
						signedIn: this.state.signedIn,
						setSignInStatus: this.setSignInStatus,
						getData: this.getData,
						setData: this.setData,
						getPassword: this.getPassword,
						setPassword: this.setPassword,
						login: this.login,
						logout: this.logout
					}}/>
					<ModalPopUp show={() => {
						return this.state.error
					}}
						text={() => {
							return this.state.errorMessage
						}}
						onPress={() => {
							this.setState({error: false})
						}}/>
				</PaperProvider>
			</SafeAreaProvider>
		);
	}
}