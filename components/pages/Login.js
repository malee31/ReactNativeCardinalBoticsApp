import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import Screen from "../parts/StyledParts/ScreenWrapper";
import LargeLogo from "../parts/StyledParts/LargeLogo";
import useUserInfo from "../parts/ContextProviders/UserInfoProvider";
import useModal from "../parts/ContextProviders/ModalProvider";
import { login } from "../parts/utils/serverClientWrapper";
import { colors } from "../../config.json";

const loginStyles = StyleSheet.create({
	loginInput: {
		color: "#7D1120",
		width: "70%",
	},
	loginButton: {
		width: "70%",
		backgroundColor: colors.gray,
		marginVertical: 5,
	},
	loginButtonContent: {
		alignItems: "center",
		justifyContent: "center",
		alignSelf: "center",
		padding: 10
	},
	loginButtonText: {
		color: colors.darkerGray,
		fontSize: 20,
		fontWeight: "bold",
	}
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

	return (<Screen navigation={navigation}>
		<LargeLogo/>
		<TextInput
			label="Login"
			value={passwordInput}
			style={loginStyles.loginInput}
			secureTextEntry={true}
			onChange={newText => setPasswordInput(newText.nativeEvent.text)}
			onSubmitEditing={handleLogin}
		/>
		<Button
			onPress={handleLogin}
			compact={true}
			mode="contained"
			style={loginStyles.loginButton}
			contentStyle={loginStyles.loginButtonContent}
			labelStyle={loginStyles.loginButtonText}
		>
			Submit
		</Button>
	</Screen>);
}