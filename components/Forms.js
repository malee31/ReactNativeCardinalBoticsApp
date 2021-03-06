import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import LinkButton from "./parts/LinkButton.js";
import config from "../config.json";
import React from "react";
import Styles from "./parts/Styles.js";

export default class Forms extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		};
	}

	componentDidMount() {
		fetch(config.urls.sheet).then(response => {
			return response.json();
		}).then(json => {
			json = json.values;
			for (let sheetRow = 0; sheetRow < json.length; sheetRow++) {
				if (sheetRow === 0 || json[sheetRow][0].trim() !== json[sheetRow - 1][0].trim()) {
					json.splice(sheetRow, 0, json[sheetRow][0].trim());
					sheetRow++;
				}
			}
			this.setState({data: json});
		}).catch(error => {
			console.error(error)
		});
	}

	shouldComponentUpdate(nextProps, nextState) {
		return this.state.data.length !== nextState.data.length;
	}

	render() {
		return (
			<View style={Styles.screen}>
				{this.state.data.length === 0
					? (
						<ActivityIndicator size="large" color={config.colors.primary}/>
					) : (
						<FlatList
							data={this.state.data}
							keyExtractor={item => item[1] + ": " + item[2]}
							renderItem={entry => {
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
											{entry[4].trim().toLowerCase() !== "n/a" && entry[4].trim() !== "" ? (
												<Text style={Styles.formText}>
													Due {entry[4]}
												</Text>
											) : null}
											<LinkButton
												style={[Styles.resourceButton, Styles.formBtn]}
												title={entry[1]} url={entry[2]}/>
										</View>
									);
								}
							}}
						/>
					)
				}
			</View>
		);
	}
}