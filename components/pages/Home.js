import Logo from "../../assets/cardinalbotics_logo_white_clear.png";
import { signIn, signOut } from "../parts/serverClient";
import useUserInfo from "../parts/UserInfoProvider";
import useModal from "../parts/ModalProvider";
import MenuButton from "../parts/MenuButton";
import { Button, Text } from "react-native-paper";
import { Image, View } from 'react-native';
import config from "../../config.json";
import Styles from "../parts/Styles";
import React, { useEffect, useState } from "react";


export default function Home({ navigation }) {
	const modal = useModal();
	const userInfo = useUserInfo(false);
	const displayName = userInfo.data.name.trim();
	const [loading, setLoading] = useState(false);
	const showLoading = loading || !userInfo.data.loaded;

	useEffect(() => {
		if(userInfo.data.loaded && !userInfo.data.password) {
			modal.showMessage("Looks like it's your first time here!\nLog in to get started!");
			navigation.navigate("Login");
		}
	}, [userInfo.data.loaded]);

	const toggleSignIn = () => {
		if(!userInfo.data.password) {
			modal.showMessage("You have to log in first!");
			navigation.navigate("Login");
			return;
		}
		setLoading(true);
		if(!userInfo.data.signedIn) {
			signIn(userInfo.data.password)
				.then(result => {
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
			<Button
				onPress={toggleSignIn}
				compact={true}
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
					width: "100%",
					padding: "5%"
				}}
				labelStyle={{
					color: showLoading || !userInfo.data.loggedIn ? "gray" : (userInfo.data.signedIn ? "red" : "green"),
					fontSize: 30,
					fontWeight: "bold"
				}}
			>
					{!showLoading && (!userInfo.data.loggedIn ? "Log in to get started!" : `Sign ${userInfo.data.signedIn ? "Out" : "In"} as ${displayName}`)}
			</Button>
		</View>
	);
}