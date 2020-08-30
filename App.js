import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createAppContainer} from 'react-navigation';
import {StatusBar} from 'expo-status-bar';
import React from "react";

import config from "./config.json";
import Home from "./components/Home.js";
import Resources from "./components/Resources.js";
import Forms from "./components/Forms.js";
import Calendar from "./components/CalendarFragment.js";
import Login from "./components/Login.js";

import HomeIcon from "./images/home.svg";
import LoginIcon from "./images/login.svg";
import CalendarIcon from "./images/calendar.svg";
import ResourcesIcon from "./images/list.svg";
import FormsIcon from "./images/form.svg";

const drawerTheme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: config.colors.primary,
        accent: config.colors.cardinalWhite
    },
};

const Drawer = createAppContainer(createDrawerNavigator({
<<<<<<< HEAD
    Home: {screen: Home},
    Login: {screen: Login},
    Calendar: {screen: Calendar},
    Resources: {screen: Resources},
    Forms: {screen: Forms},
}, {
    contentComponent: (props) => (
        <SafeAreaView style={styles.masterContainer}>
            <View style={styles.drawerHeading}>
                <Image source={require("./assets/cardinalbotics_logo_white_clear.png")}
                       resizeMode="contain"
                       style={styles.drawerLogo}/>
                <Text style={styles.drawerText}>Welcome</Text>
            </View>
            <ScrollView>
                <DrawerItems {...props} />
            </ScrollView>
        </SafeAreaView>
    )
}));

export default class App extends React.Component {
    render() {
        return (
            <PaperProvider theme={drawerTheme} style={styles.masterContainer}>
                <StatusBar hidden animated backgroundColor="#7D1120"/>
                {/*<NavigationContainer>*/}
                <Drawer/>
                {/*</NavigationContainer>*/}
            </PaperProvider>
        );
    }
=======
	Home: {screen: Home,
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
	Login: {screen: Login,
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
	Calendar: {screen: Calendar,
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
	Resources: {screen: Resources,
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
	Forms: {screen: Forms,
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
				<Image source={require("./assets/cardinalbotics_logo_white_clear.png")}
					resizeMode="contain"
					style={styles.drawerLogo}/>
				<Text style={styles.drawerText}>Logged in as {props.screenProps.displayText}</Text>
			</View>
			<ScrollView>
				<DrawerItems {...props} />
			</ScrollView>
		</SafeAreaView>
	)
}));

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			password: ""
		}
		this.storeData = this.storeData.bind(this);
		this.getData = this.getData.bind(this);

		this.getData("password", value => {
			this.setState({password: value});
		}, err => {
			console.warn("No password found in memory.");
		})
	}

	storeData(key, value, onSuccess, onFail) {
		if(!key || !value) {
			console.warn("Uh oh. Invalid key or value to save");
			return;
		}
		onSuccess = typeof onSuccess == "function" ? onSuccess : () => {console.log(`SUCCESSFULLY SAVED ${value} as ${key}`)};
		onFail = typeof onFail == "function" ? onFail : () => {console.log(`Failed to save ${value} as ${key} :(`)};

		AsyncStorage.setItem(key, JSON.stringify(value)).then(onSuccess).catch(onFail);
	}

	getData(key, onSuccess, onFail) {
		if(typeof key !== "string") {
			console.warn("Uh oh. Invalid key or value to save");
			return;
		}
		onSuccess = typeof onSuccess == "function" ? onSuccess : value => {console.log(`SUCCESSFULLY GOT ${value} from ${key}... and did nothing with it`)};
		onFail = typeof onFail == "function" ? onFail : () => {console.log(`Failed to get ${key} :(`)};

		AsyncStorage.getItem(key).then(onSuccess).catch(onFail);
	}

	render() {
		return (
			<PaperProvider theme={drawerTheme} style={styles.masterContainer}>
				<StatusBar hidden animated backgroundColor="#7D1120"/>
				{/*<NavigationContainer>*/}
				<Drawer screenProps={{
					displayText: this.state.password,
					getData: this.getData,
					storeData: this.storeData
				}}/>
				{/*</NavigationContainer>*/}
			</PaperProvider>
		);
	}
>>>>>>> b3e5966108e0bb1732bd0298af4dd12de0f2d8fb
}

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
        color: "#EEE",
        textAlign: "center",
    }
});