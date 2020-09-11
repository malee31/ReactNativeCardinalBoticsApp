import {FlatList, Text, View} from 'react-native';
import LinkButton from "./parts/LinkButton.js";
import config from "../config.json";
import React from "react";
import Styles from "./parts/Styles.js";

export default class Resources extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false
		};
	}

	componentDidMount() {
		fetch(config.urls.resources).then(response => {
			return response.json();
		}).then(json => {
			this.setState({data: json.values});
		}).catch(error => {
			console.error(error);
		}).finally(() => {
			this.setState({isLoading: false});
		});
	}

	render() {
		return (
			<View style={Styles.screen}>
				{this.state.isLoading ? <Text> Loading </Text> : (
					<FlatList
						data={this.state.data}
						keyExtractor={item => item[0] + ": " + item[1]}
						renderItem={(entry) => {
							entry = entry.item;
							return (
								<LinkButton
									title={entry[0]}
									url={entry[1]}
									icon={entry[2]}
									style={Styles.resourceButton}
								/>
							);
						}}
					/>
				)}
			</View>
		);
	}
}