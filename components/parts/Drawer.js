import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, Text, View } from "react-native";
import Favicon from "../../assets/favicon.png"
import Icons from "./AllIconsSVG";
import Styles from "./Styles.js";
import React from "react";

import DemoComponentProducer from "../DummyElement";

/*
// import Calendar from "../CalendarFragment";
import Leaderboard from "../Leaderboard";
import Resources from "../Resources";
import Forms from "../Forms";
import Login from "../Login";
import Home from "../Home";
*/

const DrawerNavigator = createDrawerNavigator();

function DrawerContent(props) {
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
						Insert Login Status Here
					</Text>
					<Text style={Styles.drawerTimeIn}>
						Insert Time Here
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
				screenOptions={{

				}}
				drawerContent={DrawerContent}
			>
				<DrawerNavigator.Screen
					name="Home"
					component={DemoComponentProducer("Home Screen")}
					options={{
						drawerIcon: Icons.Home
					}}
				/>
				<DrawerNavigator.Screen
					name="Login"
					component={DemoComponentProducer("Login Screen")}
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