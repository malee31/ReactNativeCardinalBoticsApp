import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import Styles from "../parts/Styles.js";
import config from "../../config.json";
import React, { useEffect, useState } from "react";
import MenuButton from "../parts/MenuButton";
import { getLeaderboard } from "../parts/serverClient";

function formatTime(totalTime) {
	// let currentTime = Math.round((new Date()).getTime() / 1000) - entry.lastTime;
	// currentTime = currentTime < config.serverData.flagTime ? currentTime : 0;
	// let totalTime = entry.totalTime/* + currentTime*/;
	return `${Math.floor(totalTime / 3600)} hour${Math.floor(totalTime / 3600) !== 1 ? "s" : ""} and ${Math.floor((totalTime % 3600) / 60)} minute${Math.floor((totalTime % 3600) / 60) !== 1 ? "s" : ""}`;
}

export default function Leaderboard({navigation}) {
	const [leaderboardData, setLeaderboardData] = useState([]);
	let content = <ActivityIndicator size="large" color={config.colors.primary}/>;

	useEffect(() => {
		getLeaderboard()
			.then(val => {
				console.log(val);
				setLeaderboardData(val);
			});
	}, []);

	if(leaderboardData) {
		content = <FlatList
			scrollEventThrottle={16}
			data={leaderboardData}
			keyExtractor={item => item.id.toString()}
			renderItem={entry => {
				entry = entry.item;
				return (
					<View style={Styles.timeLogRow}>
						<Text style={{
							color: entry.signedIn ? "green" : "black",
							fontSize: 16,
						}}>{entry.name}: {formatTime(entry.totalTime)}{Boolean(entry.signedIn) && ` + ${formatTime(entry.timeIn / 1000)}`}</Text>
					</View>
				);
			}}
		/>;
	}

	return (
		<View style={Styles.screen}>
			<MenuButton navigation={navigation}/>
			{content}
		</View>
	);
}