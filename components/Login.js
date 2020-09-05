import {Image, Text, TouchableHighlight, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import React from "react";
import config from "../config.json";
import ModalPopUp from "./parts/ModalPopUp";
import Styles from "./parts/Styles";

export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			ID: "",
			signedIn: props.signedIn,
			error: false,
			errorMessage: "Something went wrong",
			setPassword: props.setPassword
		};
		this.login = this.login.bind(this);
		console.log(this.state.signedIn);
	}

	login() {
		let newPass = this.state.ID.trim();
		if (newPass.length === 0) {
			this.setState({
				ID: "",
				error: true,
				errorMessage: "HEY! No empty passwords!"
			});
			return;
		}
		if (this.state.signedIn) {
			console.log("ABORT! SIGNED IN!")
			this.setState({
				error: true,
				errorMessage: "You can't switch users while signed in!"
			});
			return;
		}

		this.setState({
			ID: "",
			error: true,
			errorMessage: "Verifying that you exist."
		});

		let url = config.serverEndpointBaseURLs.getUserData + encodeURI(`?password=${newPass}`);
		fetch(url)
			.then(res => res.json())
			.then((json) => {
				let user = json.username;

				this.state.setPassword(newPass, () => {
					this.setState({
						errorMessage: `Success. You're now logged in as ${user} using ${newPass}`,
						error: true
					});
				}, null, user);
			}).catch(err => {
			this.setState({
				error: true,
				errorMessage: `Error: Looks like either you don't exist or the server behaved unexpectedly\n\n${JSON.stringify(err)}`
			});
		});
	}

	render() {
		return (
			<View style={Styles.screen}>
				<Image source={require("../assets/cardinalbotics_logo_white_clear.png")}
					resizeMode="contain"
					style={Styles.largeLogoImage}/>
				<TextInput
					label="Login"
					value={this.state.ID}
					style={Styles.whatchuDoing}
					onChange={newText => this.setState({ID: newText.nativeEvent.text})}/>
				<TouchableHighlight onPress={this.login}
					activeOpacity={0.7}
					underlayColor={config.colors.darkGray}
					style={Styles.signInButton}>
					<View>
						<Text>Submit</Text>
					</View>
				</TouchableHighlight>
				<ModalPopUp show={() => {
					return this.state.error
				}} text={() => {
					return this.state.errorMessage
				}}
					onPress={() => {
						this.setState({error: false})
					}}/>
			</View>
		);
	};
}