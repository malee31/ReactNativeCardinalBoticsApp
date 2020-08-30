import {FlatList, StyleSheet, Text, View} from 'react-native';
import LinkButton from "./parts/LinkButton.js";
import config from "../config.json";
import React from "react";
import Icon from "../images/form.svg";

export default class Forms extends React.Component {
<<<<<<< HEAD
    static navigationOptions = {
        drawerLabel: 'Forms',
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
            linkPairs: [],
            isLoading: false
        };
    }
=======
	constructor(props) {
		super(props);
		this.state = {
			linkPairs: [],
			isLoading: false
		};
	}
>>>>>>> b3e5966108e0bb1732bd0298af4dd12de0f2d8fb

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
                        keyExtractor={(item, index) => item[1] + ": " + item[2]}
                        renderItem={(entry) => {
                            entry = entry.item;
                            return (
                                <View style={styles.formButton}>
                                    <LinkButton
                                        title={entry[1]} url={entry[2]}/>
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
    formButton: {
        width: "100%",
        height: 40,
        flex: 1,
        paddingHorizontal: 30,
        marginVertical: 10
    },
});