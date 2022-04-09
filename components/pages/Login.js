import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import useUserInfo from "../parts/ContextProviders/UserInfoProvider";
import useModal from "../parts/ContextProviders/ModalProvider";
import { login } from "../parts/utils/serverClientWrapper";
import Screen from "../parts/StyledParts/ScreenWrapper";
import LargeLogo from "../parts/StyledParts/LargeLogo";
import { TextInput } from 'react-native-paper';
import { colors } from "../../config.json";
import React, { useState } from "react";

const loginStyles = StyleSheet.create({
	loginInput: {
		color: "#7D1120",
		width: "70%",
	},
	loginButton: {
		alignItems: "center",
		justifyContent: "center",
		alignSelf: "center",
		backgroundColor: colors.gray,
		width: "70%",
		padding: "2%",
		marginVertical: "3%",
	},
});

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
			<LargeLogo/>
			<TextInput
				label="Login"
				value={passwordInput}
				style={loginStyles.loginInput}
				onChange={newText => setPasswordInput(newText.nativeEvent.text)}
				onSubmitEditing={handleLogin}
			/>
			<TouchableHighlight
				onPress={handleLogin}
				activeOpacity={0.7}
				underlayColor={colors.darkGray}
				style={loginStyles.loginButton}
			>
				<View>
					<Text>Submit</Text>
				</View>
			</TouchableHighlight>
		</Screen>
	);
}