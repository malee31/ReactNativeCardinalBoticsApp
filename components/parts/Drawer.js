import config from "../../config.json";
import {createAppContainer} from "react-navigation";
import {createDrawerNavigator, DrawerItems} from "react-navigation-drawer";
import { LinearGradient } from 'expo-linear-gradient';
import Home from "../Home";
import HomeIcon from "../../images/home.svg";
import Login from "../Login";
import LoginIcon from "../../images/login.svg";
import Leaderboard from "../Leaderboard";
import LeaderboardIcon from "../../images/volunteer.svg";
// import Calendar from "../CalendarFragment";
// import CalendarIcon from "../../images/calendar.svg";
import Resources from "../Resources";
import ResourcesIcon from "../../images/list.svg";
import Forms from "../Forms";
import FormsIcon from "../../images/form.svg";
import {SafeAreaView} from "react-native-safe-area-context";
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import React from "react";

const styles = StyleSheet.create({
	masterContainer: {
		flex: 1
	},
	drawerHeading: {
		width: "100%",
		height: "20%",
		alignItems: 'flex-start',
		justifyContent: 'space-around'
	},
	drawerLogo: {
		width: "40%",
		height: "50%",
		maxHeight: "50%",
		borderRadius: 15
	},
	drawerText: {
		fontSize: 18,
		color: "#FFF",
		textAlign: "left",
		marginHorizontal: 15
	},
	drawerTimeIn: {
		fontSize: 16,
		color: "#FFF",
		textAlign: "left",
		marginHorizontal: 15
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
	// Calendar: {
	// 	screen: Calendar,
	// 	navigationOptions: {
	// 		drawerLabel: 'Calendar',
	// 		drawerIcon: () => (
	// 			<CalendarIcon
	// 				width={30}
	// 				height={30}
	// 				fill={config.colors.secondary}
	// 			/>
	// 		)
	// 	}
	// },
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
			<LinearGradient
				colors={["#7D1120", "#A6242F", "#FF4D4D"]}
				start={[0, 0]}
				end={[1, 1]}
				style={styles.drawerHeading}>
				<Image source={require("../../assets/favicon.png")}
					resizeMode="contain"
					style={styles.drawerLogo}/>
				<View>
					<Text style={styles.drawerText}>
						{props.screenProps.userText ? `Logged in as ${props.screenProps.userText}` : "Not Logged In"}
					</Text>
					<Text style={styles.drawerTimeIn}>
						Session Time: {typeof props.screenProps.timeIn === "string" ? props.screenProps.timeIn : "No Session"}
					</Text>
				</View>
			</LinearGradient>
			<ScrollView>
				<DrawerItems {...props} />
			</ScrollView>
		</SafeAreaView>
	)
}));

export default Drawer;