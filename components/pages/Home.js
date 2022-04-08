import Logo from "../../assets/cardinalbotics_logo_white_clear.png";
import { signIn, signOut } from "../parts/utils/serverClient";
import useUserInfo from "../parts/ContextProviders/UserInfoProvider";
import useModal from "../parts/ContextProviders/ModalProvider";
import { Button } from "react-native-paper";
import { Image } from 'react-native';
import { colors } from "../../config.json";
import Styles from "../parts/Styles";
import React, { useEffect, useState } from "react";
import Screen from "../parts/StyledParts/ScreenWrapper";

export default function Home({ navigation }) {
	const modal = useModal();
	const userWritable = useUserInfo(false);
	const displayName = userWritable.userInfo.name.trim();
	const [loading, setLoading] = useState(false);
	const showLoading = loading || !userWritable.userInfo.loaded;

	useEffect(() => {
		if(userWritable.userInfo.loaded && !userWritable.userInfo.password) {
			modal.showMessage("Looks like it's your first time here!\nLog in to get started!");
			navigation.navigate("Login");
		}
	}, [userWritable.userInfo.loaded]);

	const toggleSignIn = () => {
		if(!userWritable.userInfo.password) {
			modal.showMessage("You have to log in first!");
			navigation.navigate("Login");
			return;
		}
		setLoading(true);
		if(!userWritable.userInfo.signedIn) {
			signIn(userWritable.userInfo.password)
				.then(result => {
					if(result.ok) {
						userWritable.updateData({
							signedIn: result.data.signedIn
						});
					} else {
						modal.showMessage(result.messages.join("\n"));
					}
					setLoading(false);
				});
		} else {
			signOut(userWritable.userInfo.password)
				.then(result => {
					if(result.ok) {
						userWritable.updateData({
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
		<Screen navigation={navigation}>
			<Image
				source={Logo}
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
					backgroundColor: colors.gray,
					width: "100%",
					padding: "5%"
				}}
				labelStyle={{
					color: showLoading || !userWritable.userInfo.loggedIn ? "gray" : (userWritable.userInfo.signedIn ? "red" : "green"),
					fontSize: 30,
					fontWeight: "bold"
				}}
			>
				{!showLoading && (!userWritable.userInfo.loggedIn ? "Log in to get started!" : `Sign ${userWritable.userInfo.signedIn ? "Out" : "In"} as ${displayName}`)}
			</Button>
		</Screen>
	);
}