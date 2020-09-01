import {FlatList, StyleSheet, Text, View} from 'react-native';
import LinkButton from "./parts/LinkButton.js";
import config from "../config.json";
import React from "react";

export default class Leaderboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            linkPairs: [],
            isLoading: false,
            title: props.title || "Resource",
        };
    }

    componentDidMount() {
        fetch(config.urls.resources)
            .then((response) => response.json())
            .then((json) => {
                this.setState({data: json.values});
            })
            .catch((error) => console.error(error))
            .finally(() => {
                this.setState({isLoading: false});
            });
    }

    render() {
        return (
            <View style={styles.screen}>
                {this.state.isLoading ? <Text> Loading </Text> : (
                    <FlatList
                        data={this.state.data}
                        keyExtractor={(item, index) => item[0] + ": " + item[1]}
                        renderItem={(entry) => {
                            entry = entry.item;
                            return (
                                <View style={styles.resourceButton}>
                                    <Text
                                        title={entry[0]}
                                    />
                                </View>
                            );
                        }}
                    />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    screen: {
        paddingVertical: '10%',
    },
    resourceButton: {
        width: "100%",
        height: 40,
        flex: 1,
        paddingHorizontal: 30,
        marginVertical: 10
    },
});