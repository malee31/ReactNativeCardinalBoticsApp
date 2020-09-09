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
			timeIn: 0, //Time in measured in seconds as an integer or long
			lastTime: 0,
			updateTimer: null,
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
			if (value) this.setState({password: value});

			let url = config.serverEndpointBaseURLs.getUserData + encodeURI(`?password=${value}`);
			fetch(url)
				.then(res => {
					if (res.status !== 200) return false;
					return res.json();
				})
				.then((json) => {
					if (json !== false) {
						this.setState({
							user: json.username
						});
					} else {
						this.setState({
							error: true,
							errorMessage: "Looks like it's your first time on the app!\nSwipe from the left to open the menu to log in and get started!"
						});
					}
					if (typeof this.state.updateTimer !== "number") this.state.updateTimer = setInterval(() => {
						let url = config.serverEndpointBaseURLs.getUserData + encodeURI(`?password=${value}`);
						fetch(url)
							.then(res => res.json())
							.then(json => {
								this.setState({
									user: json.username,
									signedIn: json.signedIn,
									timeIn: json.signedIn ? Math.round((new Date()).getTime() / 1000) - json.lastTime : 0,
									lastTime: json.lastTime
								});
							})
							.catch(err => {
								console.log("F. Failed to update data");
							});
					}, 5000);

					if (typeof this.state.timer !== "number") this.state.timer = setInterval(() => {
						if (this.state.signedIn) this.setState({
							timeIn: Math.round((new Date()).getTime() / 1000) - this.state.lastTime
						});
					}, 250);
				}).catch(err => {

				this.setState({
					error: true,
					errorMessage: `Error: Looks like either you don't exist or the server behaved unexpectedly.\nMake sure you're logged in!\n\n${JSON.stringify(err)}`
				});
			});
		}, () => {
			this.setState({
				error: true,
				errorMessage: "No password found in memory. Go to the Login page to log in!"
			});
		});
		console.log("MOUNT LEADERBOARD.JS");
	}

	componentWillUnmount() {
		clearInterval(this.state.timer);
		clearInterval(this.state.updateTimer);
		console.log("UNMOUNT APP.JS");
	}

	setSignInStatus(status) {
		this.setState({
			signedIn: status
		});
	}

	async setPassword(newPass, onStart) {
		newPass = newPass.trim();
		if (newPass.length === 0) {
			console.log("HEY! No empty passwords!");
			throw "HEY! No empty passwords!";
		} else if (this.state.signedIn) {
			console.log("You can't switch users while signed in!");
			throw "You can't switch users while signed in!";
		}

		if (typeof onStart == "function") onStart("Verifying that you exist");

		let url = config.serverEndpointBaseURLs.getUserData + encodeURI(`?password=${newPass}`);
		let user;

		try {
			let json = await fetch(url);
			// console.log("\nFETCHED: " + JSON.stringify(json));
			if(json.status === 404) throw "Error: Looks like you don't exist. Sorry.";
			json = await json.json();
			// console.log("\nPARSED: " + JSON.stringify(json));
			user = json.username;
			// console.log("\nSNATCHED: " + JSON.stringify(user));
			this.setState({
				user: user,
				password: newPass
			});
		} catch(err) {
			if(typeof err == "string") throw err;
			else throw `Error: Looks like the server behaved unexpectedly\n\n${JSON.stringify(err)}`;
		}

		console.log(`Success. You're now logged in as ${user} using ${newPass}`);
		return `Success. You're now logged in as ${user} using ${newPass}`;
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
			console.warn("Uh oh. Invalid key or value to retrieve");
			return;
		}

		AsyncStorage.getItem(key).then(onSuccess).catch(onFail);
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