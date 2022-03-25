import { Image, Text, TouchableHighlight, View } from 'react-native';
import React from "react";

import config from "../../config.json";
import Styles from "../parts/Styles.js";
import useUserInfo from "../parts/UserInfoProvider";
import Logo from "../../assets/cardinalbotics_logo_white_clear.png";
import useModal from "../parts/ModalProvider";
import MenuButton from "../parts/MenuButton";
import { signIn, signOut } from "../parts/serverClient";
import CustomModal from "../parts/ModalPopUp";

export default function Home({ navigation }) {
	const userInfo = useUserInfo(false);
	const modal = useModal();

	const toggleSignIn = () => {
		if(userInfo.data.signedIn) {
			signIn(userInfo.data.password)
				.then(result => {
					if(result.ok) {
						userInfo.updateData({
							signedIn: 0
						});
					} else {
						modal.showMessage(result.messages.join("\n"));
					}
				});
		} else {
			signOut(userInfo.data.password)
				.then(result => {
					if(result.ok) {
						userInfo.updateData({
							signedIn: Date.now() // TODO: Fetch and use actual time
						});
						modal.showMessage("Successfully Signed Out");
					} else {
						modal.showMessage(result.messages.join("\n"));
					}
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
			<CustomModal
				show={modal.show}
				message={modal.message}
				dismiss={() => {
					modal.toggle(false);
				}}
			/>
		</View>
	);
}