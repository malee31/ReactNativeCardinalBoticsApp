import {Image, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createAppContainer} from 'react-navigation';
import React from "react";
import config from "./config.json";

import Home from "./Home.js";
import NotHome from "./NotHome.js";
import Forms from "./Forms.js";

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: config.colors.primary,
        accent: config.colors.secondary
    },
};

const Drawer = createAppContainer(createDrawerNavigator({
    Home: {screen: Home},
    Other: {screen: NotHome},
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
            <PaperProvider theme={theme} style={styles.masterContainer}>
                <StatusBar style="light"/>
                {/*<NavigationContainer>*/}
                <Drawer/>
                {/*</NavigationContainer>*/}
            </PaperProvider>
        );
    }
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
        color: "#EEEEEE",
        textAlign: "center",
    }
});