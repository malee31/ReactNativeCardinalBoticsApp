import React, { useState } from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import { Button, TextInput } from "react-native-paper";
import Screen from "../parts/StyledParts/ScreenWrappers";
import LargeLogo from "../parts/StyledParts/LargeLogo";
import useUserInfo from "../parts/ContextProviders/UserInfoProvider";
import useModal from "../parts/ContextProviders/ModalProvider";
import { login } from "../parts/utils/serverClientWrapper";
import config from "../../config.json";
import { useNavigation } from "@react-navigation/native";
import { client, getStatus } from "../parts/utils/serverClient";

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

export default function Login() {
	const navigation = useNavigation();
	const userWritable = useUserInfo(false);
	const [passwordInput, setPasswordInput] = useState("");
	const modal = useModal();

	const handleLogin = () => {
		modal.showMessage("Verifying that you exist...");
		Keyboard.dismiss();

		// Prevents client from doing things that the server can handle, but should not be allowed for the site
		if(!passwordInput) {
			modal.showMessage("Password cannot be empty");
			return;
		} else if(userWritable.userInfo.signedIn) {
			modal.showMessage("Cannot switch users while signed in");
			return;
		}

		client.login(passwordInput)
			.then(async (valid) => {
				if(!valid) {
					modal.showMessage("Incorrect password");
					return;
				}

				const result = await getStatus();
				if(!result.ok || !result.data.verified) {
					throw new Error(result.messages.join("\n"));
				}

				userWritable.updateData({
					loggedIn: true,
					name: result.data.user.name,
					apiKey: result.data.user.apiKey,
					signedIn: result.data.user.signedIn
				});
				modal.showMessage(`Successfully Logged In as ${result.data.user.name}`);

				// noinspection JSCheckFunctionSignatures
				navigation.navigate("Home");
			})
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
		</Screen>
	);
}