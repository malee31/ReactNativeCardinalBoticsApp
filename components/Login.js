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
			error: false,
			errorMessage: "Something went wrong"
		};
		this.login = this.login.bind(this);
	}

	login() {
		this.props.setPassword(this.state.ID, () => {
			this.setState({
				error: true,
				errorMessage: "Verifying that you exist."
			});
		}).then(successText => {
			this.setState({
				ID: "",
				error: true,
				errorMessage: successText
			});
		}).catch(failText => {
			this.setState({
				error: true,
				errorMessage: failText
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