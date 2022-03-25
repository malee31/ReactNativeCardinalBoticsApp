import { Image, Text, TouchableHighlight, View } from 'react-native';
import React, { useState } from "react";

import config from "../../config.json";
import Styles from "../parts/Styles.js";
import useUserInfo from "../parts/UserInfoProvider";
import Logo from "../../assets/cardinalbotics_logo_white_clear.png";
import useModal from "../parts/ModalProvider";
import MenuButton from "../parts/MenuButton";

/**
 * Signs a user in or out
 * @param {string} password Password of the user to sign in or out
 * @param {boolean} [signIn=true] If set to false, will sign the user out instead
 * @return {Promise} Resolves after a response is received from the server and parsed
 */
async function signInOut(password, signIn=true) {
	const { signIn: signInEndpoint, signOut: signOutEndpoint } = config.serverEndpointBaseURLs;
	const res = await fetch(signIn ? signInEndpoint : signOutEndpoint, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({password: password})
	});

	if(res.status === 400 || true) {
		return {
			status: 400,
			message: await res.text()
		};
	} else if(res.status !== 200) {
		console.log("UNABLE")
		throw `Unable to sign ${signIn ? "in" : "out"}: [${res.status}] ${res.statusText}`;
	}
	return {};
}

export default function Home({ navigation }) {
	const userInfo = useUserInfo(false);
	const modal = useModal();

	const toggleSignIn = () => {
		if(userInfo.data.signedIn) {
			signInOut(userInfo.data.password, false)
				.then(() => {
					userInfo.updateData({
						signedIn: 0
					});
				})
				.catch(failText => {
					modal.showMessage(failText);
				});
		} else {
			signInOut(userInfo.data.password)
				.then(jsonResponse => {
					userInfo.updateData({
						signedIn: jsonResponse.status === 400 ? Date.now() : Date.now()
					});
				})
				.catch(failText => {
					modal.showMessage(failText);
				});
		}
	};

	return (
		<View style={Styles.screen}>
			<MenuButton navigation={navigation}/>
			<Image source={Logo}
				resizeMode="contain"
				style={Styles.largeLogoImage}/>
			<TouchableHighlight onPress={toggleSignIn}
				activeOpacity={0.7}
				underlayColor={config.colors.darkGray}
				style={Styles.signInButton}>
				<View>
					<Text style={{
						color: userInfo.data.signedIn ? "red" : "green",
						fontSize: 30,
						fontWeight: "bold"
					}}>{userInfo.data.signedIn ? "Sign Out" : "Sign In"}</Text>
				</View>
			</TouchableHighlight>
		</View>
	);
}