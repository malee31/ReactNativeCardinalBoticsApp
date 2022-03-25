import { Image, View } from 'react-native';
import React, { useState } from "react";

import Styles from "../parts/Styles.js";
import useUserInfo from "../parts/UserInfoProvider";
import Logo from "../../assets/cardinalbotics_logo_white_clear.png";
import useModal from "../parts/ModalProvider";
import MenuButton from "../parts/MenuButton";
import { signIn, signOut } from "../parts/serverClient";
import CustomModal from "../parts/ModalPopUp";
import { Button } from "react-native-paper";
import config from "../../config.json";

export default function Home({ navigation }) {
	const userInfo = useUserInfo(false);
	const [loading, setLoading] = useState(false);
	const modal = useModal();
	const showLoading = loading || !userInfo.data.loaded;

	const toggleSignIn = () => {
		setLoading(true);
		if(!userInfo.data.signedIn) {
			signIn(userInfo.data.password)
				.then(result => {
					console.log(result)
					if(result.ok) {
						userInfo.updateData({
							signedIn: Date.now() // TODO: Fetch and use actual time
						});
					} else {
						modal.showMessage(result.messages.join("\n"));
					}
					setLoading(false);
				});
		} else {
			signOut(userInfo.data.password)
				.then(result => {
					if(result.ok) {
						userInfo.updateData({
							signedIn: 0
						});
						modal.showMessage("Successfully Signed Out");
					} else {
						modal.showMessage(result.messages.join("\n"));
					}
					setLoading(false);
				});
		}
	};

	return (
		<View style={Styles.screen}>
			<MenuButton navigation={navigation}/>
			<Image source={Logo}
				resizeMode="contain"
				style={Styles.largeLogoImage}/>
			<Button onPress={toggleSignIn}
				mode="contained"
				loading={showLoading}
				disabled={showLoading}
				style={{
					width: "70%"
				}}
				contentStyle={{
					alignItems: "center",
					justifyContent: "center",
					alignSelf: "center",
					backgroundColor: config.colors.gray,
					minWidth: "100%",
					width: "100%",
					padding: "5%"
				}}
				labelStyle={{
					color: showLoading ? "gray" : (userInfo.data.signedIn ? "red" : "green"),
					fontSize: 30,
					fontWeight: "bold"
				}}
			>
				{showLoading ? "" : (userInfo.data.signedIn ? "Sign Out" : "Sign In")}
			</Button>
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