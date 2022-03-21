import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import Styles from "./parts/Styles.js";
import config from "../config.json";
import React from "react";

export default function Leaderboard(props) {
	let content = <ActivityIndicator size="large" color={config.colors.primary}/>;
	if(props.leaderboardData.length !== 0) {
		content = <FlatList
			scrollEventThrottle={16}
			data={props.leaderboardData}
			keyExtractor={item => item.key}
			renderItem={entry => {
				entry = entry.item;
				// let currentTime = Math.round((new Date()).getTime() / 1000) - entry.lastTime;
				// currentTime = currentTime < config.serverData.flagTime ? currentTime : 0;
				let totalTime = entry.totalTime/* + currentTime*/;

				let timeClocked = `${Math.floor(totalTime / 3600)} hour`;
				if(Math.floor(totalTime / 3600) !== 1) {
					timeClocked += "s";
				}
				timeClocked += ` and ${Math.floor((totalTime % 3600) / 60)} minute${Math.floor((totalTime % 3600) / 60) !== 1 ? "s" : ""}`;
				return (
					<View style={Styles.timeLogRow}>
						<Text style={{
							color: entry.signedIn ? "green" : "black",
							fontSize: 16,
						}}>{`${entry.name}: ${timeClocked}`}</Text>
					</View>
				);
			}}
		/>;
	}

	return (
		<View style={Styles.screen}>
			{content}
		</View>
	);
}