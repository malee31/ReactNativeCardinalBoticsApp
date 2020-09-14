import {FlatList, Text, View} from 'react-native';
import Styles from "./parts/Styles.js";
import React from "react";

export default class Leaderboard extends React.Component {
	render() {
		return (
			<View style={Styles.screen}>
				{this.props.leaderboardData.length === 0 ? <Text> Loading </Text> : (
					<FlatList
						scrollEventThrottle={16}
						data={this.props.leaderboardData}
						keyExtractor={item => item.key}
						renderItem={entry => {
							entry = entry.item;
							let timeClocked = `${Math.floor(entry.totalTime / 3600)} hour`;
							if (Math.floor(entry.totalTime / 3600) !== 1) {
								timeClocked += "s";
							}
							timeClocked += ` and ${Math.floor((entry.totalTime % 3600) / 60)} minute${Math.floor((entry.totalTime % 3600) / 60) !== 1 ? "s" : ""}`;
							return (
								<View style={Styles.timeLogRow}>
									<Text style={{
										color: entry.signedIn ? "green" : "black",
										fontSize: 16,
									}}>{`${entry.username}: ${timeClocked}`}</Text>
								</View>
							);
						}}
					/>
				)}
			</View>
		);
	}
}