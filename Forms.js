import {FlatList, Text, View} from 'react-native';
import LinkButton from "./LinkButton.js";
import config from "./config.json";
import React from "react";

export default class Forms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            linkPairs: [],
            isLoading: false
        };
    }

    componentDidMount() {
        fetch(config.urls.sheet)
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
            <View>
                {this.state.isLoading ? <Text> Loading </Text> : (
                    <FlatList
                        data={this.state.data}
                        keyExtractor={(item, index) => item[0] + ": " + item[1]}
                        renderItem={(entry) => {
                            entry = entry.item;
                            return (
                                <LinkButton title={entry[0]} url={entry[1]}/>
                            );
                        }}
                    />
                )}
            </View>
        );
    }
}