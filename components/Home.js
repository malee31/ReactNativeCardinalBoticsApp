import {FlatList, Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import React from "react";

import ModalPopUp from './parts/ModalPopUp.js';
import config from "../config.json";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signedIn: false,
            whatDid: "",
            error: false,
            login: props.login,
            logout: props.logout,
            getData: props.getData,
            linkPairs: [],
            isLoading: false,
            data: []
        };
        this.signInToggle = this.signInToggle.bind(this);
    }

    componentDidMount() {
        this.state.getData("password", value => {
            fetch(config.serverEndpointBaseURLs.getUserData + encodeURI(`?password=${value}`))
                .then((response) => response.json())
                .then((json) => {
                    console.log(JSON.stringify(json))
                    this.setState({
                        signedIn: json.signedIn,
                        data: json.sessions
                    });
                    console.log(json.sessions)
                })
                .catch((error) => console.error(error))
                .finally(() => {
                    this.setState({isLoading: false});
                });
        }, err => {
            //Failed to get password
        })
    }

    signInToggle() {
        if (this.state.signedIn) {
            if (this.state.whatDid.trim().length === 0) {
                this.setState({
                    error: true
                });
                console.log("Gotta make a no blank message warning here");
                return;
            }
            console.log("What was done: " + this.state.whatDid);
            this.state.logout(this.state.whatDid.trim(), res => {
                //What to do if logout succeeds
            }, failRes => {
                //What to do on fail
                console.warn("FAILED LOGOUT " + JSON.stringify(failRes));
            });
        } else {
            this.state.login(res => {
                //What to do if login succeeds
                if (res.status !== 200) {
                    //Something went wrong. Maybe invalid password or url
                    //Do something here
                    return;
                }
            }, failRes => {
                //What to do on fail
                this.setState({
                    error: true
                });
                console.warn("FAILED LOGIN " + JSON.stringify(failRes));
            });
        }

        this.setState({
            signedIn: !this.state.signedIn,
            whatDid: ""
        });
    }

    render() {
        return (
            <View style={styles.screen}>
                <Image source={require("../assets/cardinalbotics_logo_white_clear.png")}
                       resizeMode="contain"
                       style={styles.largeLogoImage}/>
                <TouchableHighlight onPress={this.signInToggle}
                                    activeOpacity={0.7}
                                    underlayColor={config.colors.darkGray}
                                    style={styles.signInButton}>
                    <View>
                        <Text style={styles.signInText}>{this.state.signedIn ? "Sign Out" : "Sign In"}</Text>
                    </View>
                </TouchableHighlight>
                <TextInput
                    label="What did you do while signed in?"
                    value={this.state.whatDid}
                    style={styles.whatchuDoing}
                    onChange={newText => this.setState({whatDid: newText.nativeEvent.text})}
                />
                <ModalPopUp show={() => {return this.state.error}} text="Hello!" onPress={() => {
                    this.setState({error: false})
                }}/>
                {this.state.isLoading ? <Text> Loading </Text> : (
                    <FlatList
                        data={this.state.data}
                        keyExtractor={(item) => item.date + ": " + item.did}
                        renderItem={(entry) => {
                            entry = entry.item;
                            return (
                                <View>
                                    <Text style={styles.log}>{`${entry.day} + ${entry.time}s: ${entry.did}`}</Text>
                                </View>
                            );
                        }}
                    />
                )}
            </View>
        );
    };
}

export default Home;

const styles = StyleSheet.create({
    screen: {
        width: "100%",
        height: "100%",
        flex: 1,
        paddingHorizontal: 30,
        marginVertical: 40,
        backgroundColor: config.colors.background,
    },
    log: {
        alignContent: "center",
        fontSize: 30

    },
    largeLogoImage: {
        width: "100%",
        maxHeight: "25%",
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