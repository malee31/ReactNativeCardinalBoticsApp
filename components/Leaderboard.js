import {FlatList, Text, View} from 'react-native';
import Styles from "./parts/Styles.js";
import config from "../config.json";
import React from "react";

export default class Leaderboard extends React.Component {
	shouldComponentUpdate(nextProps) {
		if(this.props.leaderboardData.length !== nextProps.leaderboardData.length) return true;
		for(let entry = 0; entry < this.props.leaderboardData.length; entry++) {
			let data = this.props.leaderboardData[entry];
			let newData = nextProps.leaderboardData[entry];

			if(data.signedIn !== newData.signedIn || data.totalTime !== newData.totalTime || data.lastTime !== newData.lastTime || data.username !== newData.username){
				return true;
			}
		}
		return false;
	}

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
							// let currentTime = Math.round((new Date()).getTime() / 1000) - entry.lastTime;
							// currentTime = currentTime < config.serverData.flagTime ? currentTime : 0;
							let totalTime = entry.totalTime/* + currentTime*/;

							let timeClocked = `${Math.floor(totalTime / 3600)} hour`;
							if (Math.floor(totalTime / 3600) !== 1) {
								timeClocked += "s";
							}
							timeClocked += ` and ${Math.floor((totalTime % 3600) / 60)} minute${Math.floor((totalTime % 3600) / 60) !== 1 ? "s" : ""}`;
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