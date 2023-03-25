import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import Screen from "../parts/StyledParts/ScreenWrapper";
import LargeLogo from "../parts/StyledParts/LargeLogo";
import useUserInfo from "../parts/ContextProviders/UserInfoProvider";
import useModal from "../parts/ContextProviders/ModalProvider";
import { login } from "../parts/utils/serverClientWrapper";
import config from "../../config.json";

const colors = config.colors;

const loginStyles = StyleSheet.create({
	formContainer: {
		width: "100%",
		maxWidth: 600,
		paddingHorizontal: 8,
		alignItems: "center"
	},
	loginInputContainer: {
		width: "100%",
		borderRadius: 5,
		overflow: "hidden"
	},
	loginInput: {
		width: "100%",
		color: "#7D1120",
		backgroundColor: colors.lighterGray
	},
	loginButton: {
		width: "100%",
		backgroundColor: colors.lightGray,
		marginVertical: 5,
		paddingVertical: 6,
		borderRadius: 5,

		shadowColor: colors.darkerGray,
		shadowOffset: {
			width: 0,
			height: 4
		},
		shadowRadius: 4,
		shadowOpacity: 0.25,
		elevation: 3,
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
		modal.showMessage("Verifying that you exist...");
		login(userWritable, passwordInput)
			.then(modal.showMessage)
			.catch(err => modal.showMessage(err.message));
	}

	return (
		<Screen>
			<LargeLogo/>
			<View
				style={loginStyles.formContainer}
			>
				<View style={loginStyles.loginInputContainer}>
					<TextInput
						label="Login"
						value={passwordInput}
						style={loginStyles.loginInput}
						secureTextEntry={true}
						onChange={newText => setPasswordInput(newText.nativeEvent.text)}
						onSubmitEditing={handleLogin}
					/>
				</View>
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
			</View>
		</Screen>);
}