import {Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import React from "react";
import {TextInput} from 'react-native-paper';
import Icon from "../images/login.svg";
import config from "../config.json";

class Login extends React.Component {
    static navigationOptions = {
        drawerLabel: 'Login',
        drawerIcon: () => (
            <Icon
                width={30}
                height={30}
                fill={config.colors.secondary}
            />
        )
    }

    constructor(props) {
        super(props);
        this.state = {
            signedIn: false
        };
        this.signInToggle = this.signInToggle.bind(this);
    }

    signInToggle() {
        this.setState({
            signedIn: !this.state.signedIn
        });
    }

    render() {
        return (
            <View style={styles.screen}>
                <Image source={require("../assets/cardinalbotics_logo_white_clear.png")}
                    resizeMode="contain"
                    style={styles.largeLogoImage}/>
                <MyComponent/>
                <TouchableHighlight onPress={this.signInToggle}
                    activeOpacity={0.7}
                    underlayColor={config.colors.darkGray}
                    style={styles.signInButton}>
                    <View>
                        <Text>Submit</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    };
}

const MyComponent = () => {
    const [text, setText] = React.useState('');

    return (
        <TextInput
            label="Login"
            value={text}
            style={styles.whatchuDoing}
            onChangeText={text => setText(text)}
        />
    )
};

export default Login;
const styles = StyleSheet.create({
    screen: {
        width: "100%",
        height: "100%",
        flex: 1,
        paddingHorizontal: 30,
        backgroundColor: config.colors.background,

    },
    largeLogoImage: {
        width: "100%",
        maxHeight: "25%",
        marginVertical: 30
    },
    signInButton: {
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        backgroundColor: config.colors.gray,
        width: "70%",
        padding: "5%",
        marginVertical: 50,
    },
    signInText: {
        fontSize: 30
    },
    whatchuDoing: {
        color: "#7D1120",
        marginTop: 20,
    }
});