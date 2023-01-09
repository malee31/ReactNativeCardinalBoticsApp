import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { signIn, signOut } from "../parts/utils/serverClient";
import useUserInfo from "../parts/ContextProviders/UserInfoProvider";
import useModal from "../parts/ContextProviders/ModalProvider";
import Screen from "../parts/StyledParts/ScreenWrapper";
import LargeLogo from "../parts/StyledParts/LargeLogo";
import { colors } from "../../config.json";

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
			<LargeLogo/>
			<View
				style={{
					width: "100%",
					marginTop: 16,
					alignItems: "center",
					paddingHorizontal: 8,
					overflow: "visible"
				}}
			>
				<Button
					onPress={toggleSignIn}
					compact={true}
					mode="contained"
					loading={showLoading}
					disabled={showLoading}
					style={{
						maxWidth: "100%",
						maxHeight: 160,
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: colors.lighterGray,
						borderRadius: 8,
						borderColor: colors.lighterGray,
						shadowColor: colors.darkerGray,
						shadowOffsetY: {
							height: 8
						},
						shadowRadius: 16,
						elevation: 3,
						overflowX: "hidden"
					}}
					contentStyle={{
						width: 600,
						height: 96,
						paddingHorizontal: 16,
						paddingVertical: 8,
						borderColor: colors.lighterGray,
					}}
					labelStyle={{
						color: showLoading || !userWritable.userInfo.loggedIn ? "gray" : (userWritable.userInfo.signedIn ? "red" : "green"),
						fontSize: 24,
						borderColor: colors.lighterGray,
						fontWeight: "bold",
						maxWidth: "100%"
					}}
				>
					{!showLoading && (!userWritable.userInfo.loggedIn ? "Log in to get started!" : `Sign ${userWritable.userInfo.signedIn ? "Out" : "In"} as ${displayName}`)}
				</Button>
			</View>
		</Screen>
	);
}