import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";

import ModalPopUp from "./parts/ModalPopUp.js";
import Drawer from "./parts/Drawer.js";
import config from "../config.json";


function updateLeaderboardData(name, lastTime, signedIn, update) {
	return fetch(config.serverEndpointBaseURLs.getData).then(res => {
		if(res.status !== 200) throw `Failed to connect to server with status code ${res.status}`;
		return res.json();
	}).then(json => {
		json.forEach((elem, index) => {
			elem.key = "Leaderboard #" + (index + 1);
			if(elem.name === name && (elem.lastTime !== lastTime || elem.signedIn !== signedIn)) {
				// console.log("SHOULD UPDATE USER DATA");
				// TODO: Error handle and not leave hanging promise
				update(elem.name, elem.lastTime, elem.signedIn);
			}
		});

		//Sorts by Username (a-zA-Z) then total time logged in and finally signed in/out status
		json.sort((a, b) => {
			if(a.username < b.username) {
				return -1;
			}
			if(a.username > b.username) {
				return 1;
			}
			return 0;
		}).sort((a, b) => {
			return b.totalTime - a.totalTime;
		}).sort((a, b) => {
			return b.signedIn - a.signedIn;
		});

		return json;
	}).catch(err => {
		console.log(`Failed to update basic data. F. ${JSON.stringify(err)}`);
	});
}

async function updateUserData() {
	// console.log("UPDATING");
	const pass = await getPassword()
	const url = config.serverEndpointBaseURLs.getUserData + encodeURI(`?password=${pass}`);
	return fetch(url).then(res => res.json());
}

async function getPassword() {
	return await AsyncStorage.getItem("password");
}

async function savePassword(newPass, onStart) {
	newPass = newPass.trim();
	if(newPass.length === 0) {
		// console.log("HEY! No empty passwords!");
		throw "HEY! No empty passwords!";
	} else if(this.state.signedIn) {
		// console.log("You can't switch users while signed in!");
		throw "You can't switch users while signed in!";
	}

	if(typeof onStart == "function") {
		onStart("Verifying that you exist");
	}

	const url = config.serverEndpointBaseURLs.getUserData + encodeURI(`?password=${newPass}`);
	let user;

	try {
		const json = await fetch(url).then(res => {
			if(res.status === 404) {
				throw "Error: Looks like you don't exist. Sorry.";
			}
			return res.json();
		});
		// console.log("\nPARSED: " + JSON.stringify(json));
		user = json.name;

		try {
			await AsyncStorage.setItem("password", newPass);
		} catch(err) {
			throw `Failed to save password on your phone\n\n${JSON.stringify(err)}`;
		}
	} catch(err) {
		if(typeof err == "string") throw err;
		else throw `Error: Looks like the server behaved unexpectedly\n\n${JSON.stringify(err)}`;
	}

	// console.log(`Success. You're now logged in as ${user} using ${newPass}`);
	return {
		user: user,
		password: newPass,
		message: `Success. You're now logged in as ${user} using ${newPass}`
	};
}

async function login(password) {
	if(password === "") {
		throw "You're not logged in!";
	}
	const url = `${config.serverEndpointBaseURLs.login}?password=${encodeURI(this.state.password)}`;
	return fetch(url).then(res => {
		if(res.status !== 200) {
			throw `Server responded with a ${res.status}.\nYou might not be signed in`;
		}
	});
}

async function logout(password, whatDid) {
	whatDid = whatDid.trim();
	if(whatDid.length === 0) throw "Can't Logout with a Blank Message";

	let url = `${config.serverEndpointBaseURLs.logout}?password=${encodeURI(password)}&did=${encodeURI(whatDid)}`;
	return fetch(url).then(res => {
		if(res.status !== 200) {
			throw "Unable to sign out. Try again or check your wifi connection";
		}
	});
}

export default function Base(props) {
	const [baseState, setBaseState] = useState({
		signedIn: false,
		sessions: [],
		leaderboardData: [],
		lastTime: 0, //Last time recorded by the server (Last log in or out) in unix seconds
		timeIn: 0, //Time in measured in seconds as an integer or long
		totalTime: 0,
		leaderboardTimer: null, //This timer is for updating leaderboard with general team member sign in statuses and determining when to update user data
		timer: null, //This timer is just to count the current session time
	});
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [errorModal, setErrorModal] = useState({
		error: false,
		message: "Uh oh"
	});

	const updateSelf = () => {
		updateUserData().then(data => {
			setName(data.user);
			setBaseState({
				...baseState,
				signedIn: data.signedIn,
				sessions: data.sessions.reverse(),
				timeIn: data.signedIn ? Math.round((new Date()).getTime() / 1000) - data.lastTime : 0,
				lastTime: data.lastTime
			})
		})
	};

	useEffect(() => {
		//Update the basic state (Drawer and who you are logged in as)
		getPassword().then(pass => {
			setPassword(pass || "");
			//Updates saved password in state when app starts up or tells you to log in if you haven't used it before
			if(pass === null) {
				props.setErrorMessage("Looks like it's your first time on the app!\nSwipe from the left to open the menu, log in, and get started!");
				setErrorModal({
					error: true,
					errorMessage: ""
				});
			} else {
				// Updates username in state using the password retrieved
				const url = config.serverEndpointBaseURLs.getUserData + encodeURI(`?password=${pass}`);
				fetch(url)
					.then(res => res.json())
					.then(res => setName(res.name))
					.catch(err => {
						setErrorModal({
							error: true,
							errorMessage: `Error: Looks like either you don't exist or the server behaved unexpectedly.\nMake sure you're logged in!\n\n${JSON.stringify(err)}`
						});
					});

				//Sign in session timer
				if(typeof baseState.timer !== "number") {
					setBaseState({
						...baseState,
						timer: setInterval(() => {
							if(baseState.signedIn) {
								setBaseState({
									...baseState,
									timeIn: Math.round((new Date()).getTime() / 1000 - baseState.lastTime)
								});
							}
						}, 250)
					});
				}

				// Leaderboard update timer (Also should determine when to update user data)
				if(typeof baseState.leaderboardTimer !== "number") {
					setBaseState({
						...baseState,
						leaderboardTimer: setInterval(() => {
							updateLeaderboardData(name, baseState.lastTime, baseState.signedIn, (name, lastTime, signedIn) => {
								setName(name);
								setBaseState({
									...baseState,
									lastTime: lastTime,
									signedIn: signedIn
								});
							}).then(data => {
								setBaseState({
									...baseState,
									leaderboardData: data
								});
							});
						}, 1000)
					});
					console.log("UPDATED TIMER FOR LEADERBOARD. If this runs twice... Oh no.");
				}

				// Ensure first update takes less than 5 seconds... So that was what was making it so slow...
				updateUserData().then(data => {
					setName(data.user);
					setBaseState({
						...baseState,
						signedIn: data.signedIn,
						sessions: data.sessions.reverse(),
						timeIn: data.signedIn ? Math.round((new Date()).getTime() / 1000) - data.lastTime : 0,
						lastTime: data.lastTime
					})
				});
				updateLeaderboardData(name, baseState.lastTime, baseState.signedIn, (name, lastTime, signedIn) => {
					setName(name);
					setBaseState({
						...baseState,
						lastTime: lastTime,
						signedIn: signedIn
					});
				}).then(data => {
					setBaseState({
						...baseState,
						leaderboardData: data
					});
				});
			}
		});

		return () => {
			clearInterval(baseState.timer);
			clearInterval(baseState.leaderboardTimer);
		};
	}, []);

	return (
		<PaperProvider theme={{
			...DefaultTheme,
			roundness: 2,
			colors: {
				...DefaultTheme.colors,
				primary: config.colors.primary,
				accent: config.colors.cardinalWhite
			},
		}} style={{ flex: 1 }}>
			<StatusBar animated hidden style="dark"/>
			<Drawer screenProps={{
				userText: baseState.name,
				timeIn: baseState.timeIn,
				signedIn: baseState.signedIn,
				sessions: baseState.sessions,
				leaderboardData: baseState.leaderboardData,
				getPassword: getPassword,
				setPassword: (newPass, cb) => savePassword(newPass).then(data => {
					setName(data.user);
					setPassword(data.password);
					updateUserData().then(updateSelf);
				}),
				login: () => login(password).then(updateSelf),
				logout: whatDid => logout(password, whatDid).then(updateSelf)
			}}/>
			<ModalPopUp show={errorModal.error} message={errorModal.message} dismissError={() => setErrorModal({
				error: false,
				message: ""
			})}/>
		</PaperProvider>
	);
}