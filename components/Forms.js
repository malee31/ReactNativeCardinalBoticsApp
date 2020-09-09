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
				json = json.values;
				for (let sheetRow = 0; sheetRow < json.length; sheetRow++) {
					if (sheetRow === 0 || json[sheetRow][0].trim() !== json[sheetRow - 1][0].trim()) {
						json.splice(sheetRow, 0, json[sheetRow][0].trim());
						sheetRow++;
					}
				}
				this.setState({data: json});
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
						keyExtractor={(item) => item[1] + ": " + item[2]}
						renderItem={(entry) => {
							entry = entry.item;
							if (typeof entry == "string") {
								return (
									<View style={Styles.formButton}>
										<Text style={Styles.title}>
											{entry}
										</Text>
									</View>
								);
							} else {
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
							}
						}}
					/>
				)}
			</View>
		);
	}
}