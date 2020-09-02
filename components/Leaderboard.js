import {FlatList, StyleSheet, Text, View} from 'react-native';
import config from "../config.json";
import React from "react";

export default class Leaderboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: [],
			loadCount: 0
		};
		this.updateData = this.updateData.bind(this);
	}

	componentDidMount() {
		this.updateData();
	}

	updateData() {
		fetch(config.serverEndpointBaseURLs.getData)
			.then((response) => response.json())
			.then((json) => {
				this.setState({userData: json});
			})
			.catch((error) => console.error(error))
			.finally(() => {
				this.setState({loadCount: this.state.loadCount + 1});
			});
	}

	render() {
		return (
			<View style={styles.screen}>
				{this.state.loadCount == 0 ? <Text> Loading </Text> : (
					<FlatList
						data={this.state.userData}
						key={"Leaderboard: " + this.state.loadCount}
						keyExtractor={item => item.username}
						renderItem={(entry) => {
							entry = entry.item;
							console.log(entry);
							return (
								<View style={styles.resourceButton}>
									<Text>{entry.username + " is Signed " + (entry.signedIn ? "In" : "Out")}</Text>
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
		paddingVertical: 5
	},
});