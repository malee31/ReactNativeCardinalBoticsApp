import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import Styles from "../parts/Styles.js";
import config from "../../config.json";
import React, { useEffect, useState } from "react";
import MenuButton from "../parts/MenuButton";
import { getLeaderboard } from "../parts/serverClient";
import useUserInfo from "../parts/UserInfoProvider";

function formatTime(totalTime) {
	// let currentTime = Math.round((new Date()).getTime() / 1000) - entry.lastTime;
	// currentTime = currentTime < config.serverData.flagTime ? currentTime : 0;
	// let totalTime = entry.totalTime/* + currentTime*/;
	return `${Math.floor(totalTime / 3600)} hour${Math.floor(totalTime / 3600) !== 1 ? "s" : ""} and ${Math.floor((totalTime % 3600) / 60)} minute${Math.floor((totalTime % 3600) / 60) !== 1 ? "s" : ""}`;
}

export default function Leaderboard({ navigation }) {
	const [leaderboardData, setLeaderboardData] = useState([]);
	const userInfo = useUserInfo(false);
	let content = <ActivityIndicator size="large" color={config.colors.primary}/>;

	const update = () => {
		getLeaderboard()
			.then(val => {
				setLeaderboardData(val);
				if(userInfo.data.password) {
					const user = val.find(entry => entry.name.trim() === userInfo.data.name.trim());
					const clockedIn = Date.now() - user.timeIn;
					if(Boolean(user.signedIn) !== Boolean(userInfo.data.signedIn)) {
						// console.log("RESYNC");
						if(user.signedIn) {
							userInfo.updateData({
								signedIn: clockedIn
							});
						} else {
							userInfo.updateData({
								signedIn: 0
							});
						}
					} else if(user.signedIn && Math.abs(userInfo.data.signedIn - clockedIn) > 2000 /* 2 second desync tolerance */) {
						// console.log(`Resync gap: ${Math.abs(userInfo.data.signedIn - clockedIn)}`);
						userInfo.updateData({
							signedIn: clockedIn
						});
					}
				}
			});
	};

	useEffect(() => {
		update();
		// TODO: Sync more accurately using websockets
		const timer = setInterval(update, 30 * 1000);
		return () => clearInterval(timer);
	}, [userInfo.data]);

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
						}}>{entry.name}: {formatTime(entry.totalTime / 1000)}{Boolean(entry.signedIn) && ` + ${formatTime(entry.timeIn / 1000)}`}</Text>
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