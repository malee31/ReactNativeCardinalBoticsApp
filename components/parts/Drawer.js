import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, Text, View } from "react-native";
import Favicon from "../../assets/favicon.png"
import useUserInfo from "./UserInfoProvider";
import Icons from "./AllIconsSVG";
import Styles from "./Styles.js";
import React, { useEffect, useState } from "react";


import DemoComponentProducer from "../DummyElement";
// import Calendar from "../Calendar";
import Leaderboard from "../pages/Leaderboard";
import Resources from "../pages/Resources";
import Forms from "../pages/Forms";
import Login from "../pages/Login";
import Home from "../pages/Home";


const DrawerNavigator = createDrawerNavigator();

/**
 * Takes in time in milliseconds and converts it to a readable format
 * @param {number} elapsedSeconds Number of seconds signed in
 * @return {string} Displayable elapsed time string
 */
function formatTimeIn(elapsedSeconds) {
	console.log(`Formatting: ${elapsedSeconds}`);
	const plural = (num, word) => `${num} ${word}${num === 1 ? "" : "s"}`;
	const hours = Math.floor(elapsedSeconds / 3600);
	const minutes = Math.floor((elapsedSeconds % 3600) / 60);
	const seconds = Math.floor(elapsedSeconds % 60);
	return `Signed in for: \n${plural(hours, "hour")} ${plural(minutes, "minute")} ${plural(seconds, "second")}`;
}

function DrawerContent(props) {
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
		<View style={{ flex: 1 }}>
			<LinearGradient
				colors={["#7D1120", "#A6242F", "#FF4D4D"]}
				start={[0, 0]}
				end={[1, 1]}
				style={Styles.drawerHeading}>
				<Image source={Favicon}
					resizeMode="contain"
					style={Styles.drawerLogo}/>
				<View>
					<Text style={Styles.drawerText}>
						{userInfo.loggedIn ? userInfo.name : "Not Logged In"}
					</Text>
					<Text style={Styles.drawerTimeIn}>
						{!userInfo.signedIn ? "No Sessions Active" : formatTimeIn(timeIn)}
					</Text>
				</View>
			</LinearGradient>
			<DrawerContentScrollView {...props} style={{ flexGrow: 1 }}>
				<DrawerItemList {...props}/>
			</DrawerContentScrollView>
		</View>
	)
}

function Drawer() {
	return (
		<NavigationContainer>
			<DrawerNavigator.Navigator
				initialRouteName="Home"
				backBehavior="history"
				// openByDefault={true}
				screenOptions={{}}
				drawerContent={props =>
					<DrawerContent {...props}/> /* Oddly required for hooks: https://github.com/react-navigation/react-navigation/issues/7725 */}
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
					component={DemoComponentProducer("Leaderboard Screen")}
					options={{
						drawerIcon: Icons.Leaderboard,
						drawerLabel: "Other Members"
					}}
				/>
				{/*<DrawerNavigator.Screen*/}
				{/*	name="Calendar"*/}
				{/*	component={DemoComponentProducer("Calendar Screen")}*/}
				{/*	options={{*/}
				{/*		drawerIcon: Icons.Calendar*/}
				{/*	}}*/}
				{/*/>*/}
				<DrawerNavigator.Screen
					name="Resources"
					component={DemoComponentProducer("Resources Screen")}
					options={{
						drawerIcon: Icons.Resources
					}}
				/>
				<DrawerNavigator.Screen
					name="Forms"
					component={DemoComponentProducer("Forms Screen")}
					options={{
						drawerIcon: Icons.Forms
					}}
				/>
			</DrawerNavigator.Navigator>
		</NavigationContainer>
	);
}

export default Drawer;