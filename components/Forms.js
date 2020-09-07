import {FlatList, Text, View} from 'react-native';
import LinkButton from "./parts/LinkButton.js";
import config from "../config.json";
import React from "react";
import Styles from "./parts/Styles.js";

export default class Forms extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
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
			<View style={Styles.screen}>
				{this.state.isLoading ? <Text> Loading </Text> : (
					<FlatList
						data={this.state.data}
						keyExtractor={(item, index) => item[1] + ": " + item[2]}
						renderItem={(entry) => {
							entry = entry.item;
							return (
								<View style={Styles.formButton}>
									<LinkButton
										style={Styles.formBtn}
										title={entry[1]} url={entry[2]}/>
									<Text style={Styles.formText}>
										Due {entry[4]}
									</Text>
								</View>
							);
						}}
					/>
				)}
			</View>
		);
	}
}