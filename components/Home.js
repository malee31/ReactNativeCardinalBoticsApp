import {FlatList, Image, Text, TouchableHighlight, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import React from "react";

import ModalPopUp from './parts/ModalPopUp.js';
import config from "../config.json";
import Styles from "./parts/Styles.js";

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signedIn: false,
			whatDid: "",
			error: false,
			errorMessage: "Welp, something went wrong.",
			login: props.login,
			logout: props.logout,
			getPassword: props.getPassword,
			setSignInStatus: props.setSignInStatus,
			isLoading: false,
			data: []
		};
		this.signInToggle = this.signInToggle.bind(this);
		this.updateSessions = this.updateSessions.bind(this);
	}

	componentDidMount() {
		this.updateSessions();
	}

	updateSessions() {
		this.state.getPassword(value => {
			fetch(config.serverEndpointBaseURLs.getUserData + encodeURI(`?password=${value}`))
				.then((response) => response.json())
				.then((json) => {
					this.setState({
						signedIn: json.signedIn,
						data: json["sessions"].reverse()
					});
					this.state.setSignInStatus(json.signedIn);
				})
				.catch((error) => console.error(error))
				.finally(() => {
					this.setState({isLoading: false});
				});
		}, err => {
			this.setState({
				error: true,
				errorMessage: `Failed to get past sessions with password: ${JSON.stringify(err)}`
			});
		})
	}

	signInToggle() {
		if (this.state.signedIn) {
			if (this.state.whatDid.trim().length === 0) {
				this.setState({
					error: true,
					errorMessage: "Can't Logout with a Blank Message"
				});
				return;
			}

			this.state.logout(this.state.whatDid.trim(), () => {
				this.setState({
					signedIn: false,
					whatDid: ""
				});
				this.state.setSignInStatus(false);
				this.updateSessions();
			}, failRes => {
				this.setState({
					error: true,
					errorMessage: `FAILED LOGOUT ${JSON.stringify(failRes)}`
				});
			});

		} else {
			this.state.login(res => {
				if (res.status !== 200) {
					throw `Server responded with a ${res.status}`;
				}

				this.setState({
					signedIn: true,
					whatDid: ""
				});
			}, failRes => {
				this.setState({
					error: true,
					errorMessage: `Straight up failed to log in: ${JSON.stringify(failRes)}`
				});
			});
		}
	}

	render() {
		return (
			<View style={Styles.screen}>
				<Image source={require("../assets/cardinalbotics_logo_white_clear.png")}
					resizeMode="contain"
					style={Styles.largeLogoImage}/>
				<TouchableHighlight onPress={this.signInToggle}
					activeOpacity={0.7}
					underlayColor={config.colors.darkGray}
					style={Styles.signInButton}>
					<View>
						<Text style={{
							color: this.state.signedIn ? "red" : "green",
							fontSize: 30
						}}>{this.state.signedIn ? "Sign Out" : "Sign In"}</Text>
					</View>
				</TouchableHighlight>
				{this.state.signedIn ? <TextInput
					label="What did you do while signed in?"
					value={this.state.whatDid}
					style={Styles.whatchuDoing}
					onChange={newText => this.setState({whatDid: newText.nativeEvent.text})}
				/> : <View/>}
				<ModalPopUp show={() => {
					return this.state.error
				}} text={() => {
					return this.state.errorMessage
				}}
					onPress={() => {
						this.setState({error: false})
					}}/>
				{this.state.isLoading ? <Text> Loading </Text> : (
					<FlatList
						data={this.state.data}
						keyExtractor={(item) => `${item.date}: ${item.did}`}
						renderItem={(entry) => {
							entry = entry.item;
							let timeClocked = `${Math.floor(entry.time / 3600)} hour`;
							if(Math.floor(entry.time / 3600) !== 1) {
								timeClocked += "s";
							}
							timeClocked += ` and ${Math.floor((entry.time % 3600) / 60)} minute${Math.floor((entry.time % 3600) / 60) !== 1 ? "s" : ""}`;

							if(entry.time < 60) timeClocked = `${entry.time} second${entry.time !== 1 ? "s" : ""}`;

							return (
								<View>
									<Text style={Styles.log}>{`${entry.day} for ${timeClocked}\n\t|\t${entry.did}`}</Text>
								</View>
							);
						}}
					/>
				)}
			</View>
		);
	};
}

export default Home;