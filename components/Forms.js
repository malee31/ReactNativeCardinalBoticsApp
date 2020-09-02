import {FlatList, StyleSheet, Text, View} from 'react-native';
import LinkButton from "./parts/LinkButton.js";
import config from "../config.json";
import React from "react";

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
			<View style={styles.screen}>
				{this.state.isLoading ? <Text> Loading </Text> : (
					<FlatList
						data={this.state.data}
						keyExtractor={(item, index) => item[1] + ": " + item[2]}
						renderItem={(entry) => {
							entry = entry.item;
							return (
								<View style={styles.formButton}>
									<LinkButton
										style={styles.formBtn}
										title={entry[1]} url={entry[2]}/>
										<Text>pull json here</Text>
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
		backgroundColor: config.colors.background,
		height:'100%',
	},
	formButton: {
		width: "100%",
		height: 40,
		flex: 1,
		justifyContent:'space-between',
		flexDirection: 'row',
		paddingHorizontal: 30,
		marginVertical: 10
	},
	formBtn: {
		width:30
	},
});