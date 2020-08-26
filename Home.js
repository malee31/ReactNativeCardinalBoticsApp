import {Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import React from "react";
import {TextInput} from 'react-native-paper';
import Icon from "./images/book.svg";
import config from "./config.json";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signedIn: false
        };
        this.signInToggle = this.signInToggle.bind(this);
    }

    static navigationOptions = {
        drawerLabel: 'Home',
        drawerIcon: () => (
            <Icon
                width={30}
                height={30}
                fill={config.colors.secondary}
            />
        )
    }

    signInToggle() {
        this.setState({
            signedIn: !this.state.signedIn
        });
    }

    render() {
        return (
            <View style={styles.screen}>
                <Image source={require("./assets/cardinalbotics_logo_white_clear.png")}
                       resizeMode="contain"
                       style={styles.largeLogoImage}/>
                <TouchableHighlight onPress={this.signInToggle}>
                    <View style={styles.signInButton}>
                        <Text style={styles.signInText}>{this.state.signedIn ? "Sign Out" : "Sign In"}</Text>
                    </View>
                </TouchableHighlight>
                <MyComponent/>
            </View>
        );
    };
}

const MyComponent = () => {
    const [text, setText] = React.useState('');

    return (
        <View style={styles.whatchuDoing}>
            <TextInput
                label="What did you do while signed in?"
                value={text}
                onChangeText={text => setText(text)}
            />
        </View>
    );
};

export default Home;
const styles = StyleSheet.create({
    screen: {
        width: "100%",
        height: "100%",
        flex: 1,
        paddingHorizontal: 30,
        backgroundColor: "#eaeaea"
    },
    largeLogoImage: {
        width: "100%",
        maxHeight: "25%",
        marginVertical: 30
    },
    signInButton: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#7D1120",
        height: 50
    },
    signInText: {
        fontSize: 30
    },
    whatchuDoing: {
        color: "#7D1120",
        marginTop: 20,
    }
});