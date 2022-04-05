import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import Styles from "../parts/Styles.js";
import { colors } from "../../config.json";
import React, { useEffect, useState } from "react";
import MenuButton from "../parts/MenuButton";
import useUserInfo from "../parts/UserInfoProvider";
import { updateSelf } from "../parts/serverClientWrapper";

function formatTime(totalTime) {
	return `${Math.floor(totalTime / 3600)} hour${Math.floor(totalTime / 3600) !== 1 ? "s" : ""} and ${Math.floor((totalTime % 3600) / 60)} minute${Math.floor((totalTime % 3600) / 60) !== 1 ? "s" : ""}`;
}

export default function Leaderboard({ navigation }) {
	const [leaderboardData, setLeaderboardData] = useState([]);
	const userInfo = useUserInfo(false);
	let content = <ActivityIndicator size="large" color={colors.primary}/>;

	const update = () => { updateSelf(userInfo).then(setLeaderboardData) };

	useEffect(() => {
		update();
		// TODO: Sync more accurately using websockets
		const timer = setInterval(update, 30 * 1000); // 30-second interval
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
						<Text
							style={{
								color: entry.signedIn ? "green" : "black",
								fontSize: 16
							}}
						>
							{entry.name}: {formatTime(entry.totalTime / 1000)}{Boolean(entry.signedIn) && ` + ${formatTime(entry.timeIn / 1000)}`}
						</Text>
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