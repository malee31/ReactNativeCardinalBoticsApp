import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import { signIn, signOut } from "../parts/utils/serverClient";
import useUserInfo from "../parts/ContextProviders/UserInfoProvider";
import useModal from "../parts/ContextProviders/ModalProvider";
import Screen from "../parts/StyledParts/ScreenWrappers";
import LargeLogo from "../parts/StyledParts/LargeLogo";
import config from "../../config.json";

const colors = config.colors;

export default function Home({ navigation }) {
	const modal = useModal();
	const userWritable = useUserInfo(false);
	const displayName = userWritable.userInfo.name.trim();
	const [loading, setLoading] = useState(false);
	const showLoading = loading || !userWritable.userInfo.loaded;

	useEffect(() => {
		if(userWritable.userInfo.loaded && !userWritable.userInfo.password) {
			navigation.navigate("Login");
		}
	}, [userWritable.userInfo.loaded]);

	const toggleSignIn = () => {
		if(!userWritable.userInfo.password) {
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
		<Screen>
			<LargeLogo/>
			<View
				style={{
					width: "100%",
					maxWidth: 600,
					marginTop: 16,
					alignItems: "center",
					paddingHorizontal: 8,
					overflow: "visible"
				}}
			>
				{showLoading && (
					<View
						style={{
							marginTop: 16,
							paddingVertical: 12,
						}}
					>
						<ActivityIndicator size="large"/>
					</View>
				)}
				<Button
					onPress={toggleSignIn}
					compact={true}
					mode="contained"
					disabled={showLoading}
					style={{
						display: showLoading ? "none" : "flex",
						width: "100%",
						maxHeight: 160,
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: colors.semiLighterGray,
						borderRadius: 8,
						borderColor: colors.lighterGray,
						shadowColor: colors.darkerGray,
						shadowOffsetY: {
							width: 0,
							height: 8
						},
						shadowRadius: 16,
						shadowOpacity: 0.25,
						elevation: 3,
						overflowX: "hidden"
					}}
					contentStyle={{
						display: "flex",
						alignItems: "center",
						width: "100%",
						height: 96,
						paddingHorizontal: 16,
						paddingVertical: 8,
						borderColor: colors.lighterGray,
					}}
					labelStyle={{
						color: showLoading || !userWritable.userInfo.loggedIn ? "gray" : (userWritable.userInfo.signedIn ? "red" : "green"),
						overflow: "visible",
						paddingVertical: 6,
						fontSize: 24,
						textAlign: "center",
						borderColor: colors.lighterGray,
						fontWeight: "bold",
						width: "100%",
						minWidth: 400
					}}
				>
					{!showLoading ? (!userWritable.userInfo.loggedIn ? "Log in to get started!" : `Sign ${userWritable.userInfo.signedIn ? "Out" : "In"} as ${displayName}`) : ""}
				</Button>
			</View>
		</Screen>
	);
}