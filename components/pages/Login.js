import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image, Text, TouchableHighlight, View } from 'react-native';
import Logo from "../../assets/cardinalbotics_logo_white_clear.png";
import { TextInput } from 'react-native-paper';
import config from "../../config.json";
import Styles from "../parts/Styles";
import useUserInfo from "../parts/UserInfoProvider";
import useModal from "../parts/ModalProvider";
import React, { useState } from "react";
import CustomModal from "../parts/ModalPopUp";

async function savePassword(newPass) {
	const status = {
		verified: false,
		saved: false,
		user: {},
		messages: []
	};
	const url = config.serverEndpointBaseURLs.getUserData + encodeURI(`?password=${newPass}`);

	try {
		const res = await fetch(url);
		if(res.status !== 404) {
			const jsonResponse = await res.json();
			status.verified = true;
			status.user = {
				name: jsonResponse.name,
				password: newPass
			};
		} else {
			status.messages.push("Sorry, it looks like you don't exist");
		}
	} catch(err) {
		status.messages.push(`Unable to fetch status. Are you connected to the internet?`);
	}

	if(status.verified) {
		try {
			await AsyncStorage.setItem("password", newPass);
			status.messages.push(`Success. You're now logged in as ${status.user.name} using ${status.user.password}`);
		} catch(err) {
			status.messages.push(`Logged In\nFailed to save password on your device, you will have to log in again next time`);
		}
	}

	return status;
}

export default function Login({ navigation }) {
	const userInfo = useUserInfo(false);
	const [passwordInput, setPasswordInput] = useState("");
	const modal = useModal();
	const login = () => {
		const newPassword = passwordInput.trim();
		if(passwordInput.length === 0) {
			modal.showMessage("Password cannot be empty");
			return;
		} else if(userInfo.data.signedIn) {
			modal.showMessage("Cannot switch users while signed in");
		}

		modal.showMessage("Verifying that you exist.");
		savePassword(newPassword)
			.then(status => {
				modal.showMessage(status.messages.join("\n"));
				if(status.verified) {
					userInfo.updateData({
						loggedIn: true,
						name: status.user.name,
						password: status.user.password
					});
				}
			});
	};

	return (
		<View style={Styles.screen}>
			<Image source={Logo}
				resizeMode="contain"
				style={Styles.largeLogoImage}/>
			<TextInput
				label="Login"
				value={passwordInput}
				style={Styles.signInInput}
				onChange={newText => setPasswordInput(newText.nativeEvent.text)}/>
			<TouchableHighlight onPress={login}
				activeOpacity={0.7}
				underlayColor={config.colors.darkGray}
				style={Styles.loginButton}>
				<View>
					<Text>Submit</Text>
				</View>
			</TouchableHighlight>
			<CustomModal
				show={modal.show}
				message={modal.message}
				dismiss={() => {
					modal.toggle(false);
					// TODO: Remove after adding menu button
					navigation.toggleDrawer();
				}}
			/>
		</View>
	);
}