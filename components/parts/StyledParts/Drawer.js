import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { LinearGradient } from "expo-linear-gradient";
import useUserInfo from "../ContextProviders/UserInfoProvider";

import Leaderboard from "../../pages/Leaderboard";
import Resources from "../../pages/Resources";
import Login from "../../pages/Login";
import Forms from "../../pages/Forms";
import Home from "../../pages/Home";
import Icons from "../utils/AllIconsSVG";

import Favicon from "../../../assets/favicon.png";
import config from "../../../config.json";

const colors = config.colors;

const drawerStyles = StyleSheet.create({
	header: {
		width: "100%",
		minHeight: "10%",
		paddingHorizontal: "2%",
		paddingVertical: "5%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		backgroundColor: "red"
	},
	logo: {
		width: "20%",
		height: "100%",
		borderRadius: 5,
		aspectRatio: 1
	},
	textContainer: {
		width: "80%"
	},
	text: {
		fontSize: 18,
		color: colors.cardinalWhite,
		textAlign: "left",
		marginHorizontal: 15
	},
	timeIn: {
		fontSize: 16,
		color: colors.cardinalWhite,
		textAlign: "left",
		marginHorizontal: 15
	}
});

const DrawerNavigator = createDrawerNavigator();

const HOMEPAGE = "/ReactNativeCardinalBoticsApp";
const linking = {
	prefixes: ["cardinalbotics-hours-app://"],
	config: {
		screens: {
			Home: `${HOMEPAGE}/`,
			Login: `${HOMEPAGE}/login`,
			Leaderboard: `${HOMEPAGE}/leaderboard`,
			Resources: `${HOMEPAGE}/resources`,
			Forms: `${HOMEPAGE}/forms`
		}
	}
};

/**
 * Takes in time in milliseconds and converts it to a readable format
 * @param {number} elapsedSeconds Number of seconds signed in
 * @return {string} Displayable elapsed time string
 */
function formatTimeIn(elapsedSeconds) {
	const plural = (num, word) => `${num} ${word}${num === 1 ? "" : "s"}`;
	const hours = Math.floor(elapsedSeconds / 3600);
	const minutes = Math.floor((elapsedSeconds % 3600) / 60);
	const seconds = Math.floor(elapsedSeconds % 60);
	return `Signed in for: \n${plural(hours, "hour")} ${plural(minutes, "minute")} ${plural(seconds, "second")}`;
}

function DrawerHeader() {
	const userInfo = useUserInfo();
	const [timeIn, setTimeIn] = useState(0);

	const updateTimeIn = () => {
		if(!userInfo.signedIn) {
			return;
		}
		setTimeIn(Math.floor((Date.now() - userInfo.signedIn) / 1000));
	}

	useEffect(() => {
		updateTimeIn();
		const timeTicker = setInterval(updateTimeIn, 1000);
		return () => clearInterval(timeTicker);
	}, [userInfo.signedIn]);

	return (
		<LinearGradient
			colors={["#7D1120", "#A6242F", "#FF4D4D"]}
			start={[0, 0]}
			end={[1, 1]}
			style={drawerStyles.header}>
			<Image
				source={Favicon}
				resizeMode="contain"
				style={drawerStyles.logo}
			/>
			<View style={drawerStyles.textContainer}>
				<Text style={drawerStyles.text}>
					{!userInfo.loaded ? "Loading..." : (userInfo.loggedIn ? userInfo.name : "Not Logged In")}
				</Text>
				<Text style={drawerStyles.timeIn}>
					{!userInfo.loaded ? "Loading..." : (!userInfo.signedIn ? "No Sessions Active" : formatTimeIn(timeIn))}
				</Text>
			</View>
		</LinearGradient>
	);
}

function DrawerContent(props) {
	return (
		<View style={{ flex: 1 }}>
			<DrawerHeader/>
			<DrawerContentScrollView
				{...props}
				style={{ flexGrow: 1 }}
			>
				<DrawerItemList {...props}/>
			</DrawerContentScrollView>
		</View>
	);
}

function Drawer() {
	return (
		<NavigationContainer linking={linking}>
			<DrawerNavigator.Navigator
				useLegacyImplementation={false}
				initialRouteName="Home"
				backBehavior="history"
				// defaultStatus={true}
				screenOptions={{
					headerShown: false,
					drawerActiveTintColor: colors.primary,
					drawerActiveBackgroundColor: colors.gray,
					drawerInactiveTintColor: colors.darkerGray,
					drawerInactiveBackgroundColor: colors.background
				}}
				drawerContent={props =>
					<DrawerContent {...props}/> /* Oddly required for hooks: https://github.com/react-navigation/react-navigation/issues/7725 */
				}
			>
				<DrawerNavigator.Screen
					name="Home"
					component={Home}
					options={{
						drawerIcon: Icons.Home
					}}
				/>
				<DrawerNavigator.Screen
					name="Login"
					component={Login}
					options={{
						drawerIcon: Icons.Login
					}}
				/>
				<DrawerNavigator.Screen
					name="Leaderboard"
					component={Leaderboard}
					options={{
						drawerIcon: Icons.Leaderboard,
						drawerLabel: "Other Members"
					}}
				/>
				<DrawerNavigator.Screen
					name="Resources"
					component={Resources}
					options={{
						drawerIcon: Icons.Resources
					}}
				/>
				<DrawerNavigator.Screen
					name="Forms"
					component={Forms}
					options={{
						drawerIcon: Icons.Forms
					}}
				/>
			</DrawerNavigator.Navigator>
		</NavigationContainer>
	);
}

export default Drawer;