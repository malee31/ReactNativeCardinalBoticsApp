import config from "../../config.json";
import {createAppContainer} from "react-navigation";
import {createDrawerNavigator, DrawerItems} from "react-navigation-drawer";
import Home from "../Home";
import HomeIcon from "../../images/home.svg";
import Login from "../Login";
import LoginIcon from "../../images/login.svg";
import Leaderboard from "../Leaderboard";
import LeaderboardIcon from "../../images/volunteer.svg";
import Calendar from "../CalendarFragment";
import CalendarIcon from "../../images/calendar.svg";
import Resources from "../Resources";
import ResourcesIcon from "../../images/list.svg";
import Forms from "../Forms";
import FormsIcon from "../../images/form.svg";
import {SafeAreaView} from "react-native-safe-area-context";
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import React from "react";

const styles = StyleSheet.create({
	masterContainer: {
		// marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
		flex: 1,
	},
	drawerHeading: {
		width: "100%",
		height: "25%",
		alignItems: 'center',
		justifyContent: 'flex-start'
	},
	drawerLogo: {
		width: "60%",
		height: "70%",
		maxHeight: "70%",
	},
	drawerText: {
		width: "100%",
		height: "30%",
		fontSize: 18,
		color: "#888",
		textAlign: "center",
	}
});

const Drawer = createAppContainer(createDrawerNavigator({
	Home: {
		screen: props => (
			<Home login={props.screenProps.login} logout={props.screenProps.logout} getPassword={props.screenProps.getPassword}/>),
		navigationOptions: {
			drawerLabel: 'Home',
			drawerIcon: () => (
				<HomeIcon
					width={30}
					height={30}
					fill={config.colors.secondary}
				/>
			)
		}
	},
	Login: {
		screen: props => (<Login setPassword={props.screenProps.setPassword}/>),
		navigationOptions: {
			drawerLabel: 'Login',
			drawerIcon: () => (
				<LoginIcon
					width={30}
					height={30}
					fill={config.colors.secondary}
				/>
			)
		}
	},
	Leaderboard: {
		screen: Leaderboard,
		navigationOptions: {
			drawerLabel: 'Other Members',
			drawerIcon: () => (
				<LeaderboardIcon
					width={30}
					height={30}
					fill={config.colors.secondary}
				/>
			)
		}
	},
	Calendar: {
		screen: Calendar,
		navigationOptions: {
			drawerLabel: 'Calendar',
			drawerIcon: () => (
				<CalendarIcon
					width={30}
					height={30}
					fill={config.colors.secondary}
				/>
			)
		}
	},
	Resources: {
		screen: Resources,
		navigationOptions: {
			drawerLabel: 'Resources',
			drawerIcon: () => (
				<ResourcesIcon
					width={30}
					height={30}
					fill={config.colors.secondary}
				/>
			)
		}
	},
	Forms: {
		screen: Forms,
		navigationOptions: {
			drawerLabel: 'Forms',
			drawerIcon: () => (
				<FormsIcon
					width={30}
					height={30}
					fill={config.colors.secondary}
				/>
			)
		}
	},

}, {
	contentComponent: (props) => (
		<SafeAreaView style={styles.masterContainer}>
			<View style={styles.drawerHeading}>
				<Image source={require("../../assets/cardinalbotics_logo_white_clear.png")}
					resizeMode="contain"
					style={styles.drawerLogo}/>
				<Text
					style={styles.drawerText}>{props.screenProps.userText ? `Logged in as ${props.screenProps.userText}` : "Not Logged In"}</Text>
			</View>
			<ScrollView>
				<DrawerItems {...props} />
			</ScrollView>
		</SafeAreaView>
	)
}));

export default Drawer;