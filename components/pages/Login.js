import { Image, Text, TouchableHighlight, View } from 'react-native';
import Logo from "../../assets/cardinalbotics_logo_white_clear.png";
import { TextInput } from 'react-native-paper';
import config from "../../config.json";
import Styles from "../parts/Styles";
import useUserInfo from "../parts/UserInfoProvider";
import useModal from "../parts/ModalProvider";
import React, { useState } from "react";
import MenuButton from "../parts/MenuButton";
import { verifyPassword } from "../parts/serverClient";
import { savePassword } from "../parts/storageManager";

export default function Login({ navigation }) {
	const userInfo = useUserInfo(false);
	const [passwordInput, setPasswordInput] = useState("");
	const modal = useModal();

	// TODO: Consider moving most of this logic out of the Login component
	const login = async() => {
		const newPassword = passwordInput.trim();
		if(newPassword.length === 0) {
			return modal.showMessage("Password cannot be empty");
		} else if(userInfo.data.signedIn) {
			return modal.showMessage("Cannot switch users while signed in");
		}

		modal.showMessage("Verifying that you exist.");
		const result = await verifyPassword(newPassword);
		if(!result.ok || !result.data.verified) {
			return modal.showMessage(result.messages.join("\n"));
		}

		userInfo.updateData({
			loggedIn: true,
			name: result.data.user.name,
			password: result.data.user.password
		});

		try {
			await savePassword(newPassword);
			modal.showMessage(`Success. You're now logged in as ${result.data.user.name.trim()} using ${result.data.user.password}`);
		} catch(err) {
			modal.showMessage(`Successfully Logged In!\n${err.message}`);
		}
	};

	return (
		<View style={Styles.screen}>
			<MenuButton navigation={navigation}/>
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
		</View>
	);
}