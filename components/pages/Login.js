import { Image, Text, TouchableHighlight, View } from 'react-native';
import Logo from "../../assets/cardinalbotics_logo_white_clear.png";
import { TextInput } from 'react-native-paper';
import { colors } from "../../config.json";
import Styles from "../parts/Styles";
import useUserInfo from "../parts/ContextProviders/UserInfoProvider";
import useModal from "../parts/ContextProviders/ModalProvider";
import React, { useState } from "react";
import { login } from "../parts/utils/serverClientWrapper";
import Screen from "../parts/StyledParts/ScreenWrapper";

export default function Login({ navigation }) {
	const userWritable = useUserInfo(false);
	const [passwordInput, setPasswordInput] = useState("");
	const modal = useModal();

	const handleLogin = () => {
		modal.showMessage("Verifying that you exist.");
		login(userWritable, passwordInput)
			.then(modal.showMessage)
			.catch(err => modal.showMessage(err.message));
	}

	return (
		<Screen navigation={navigation}>
			<Image
				source={Logo}
				resizeMode="contain"
				style={Styles.largeLogoImage}/>
			<TextInput
				label="Login"
				value={passwordInput}
				style={Styles.signInInput}
				onChange={newText => setPasswordInput(newText.nativeEvent.text)}
				onSubmitEditing={handleLogin}
			/>
			<TouchableHighlight
				onPress={handleLogin}
				activeOpacity={0.7}
				underlayColor={colors.darkGray}
				style={Styles.loginButton}
			>
				<View>
					<Text>Submit</Text>
				</View>
			</TouchableHighlight>
		</Screen>
	);
}