import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import Screen from "../parts/StyledParts/ScreenWrapper";
import useUserInfo from "../parts/ContextProviders/UserInfoProvider";
import { updateSelf } from "../parts/utils/serverClientWrapper";
import { colors } from "../../config.json";

const leaderboardStyles = StyleSheet.create({
	list: {
		width: "100%"
	},
	member: {
		flexDirection: "column",
		width: "100%",
		backgroundColor: colors.gray,
		borderRadius: 10,
		padding: 5,
		marginVertical: 5
	},
});

function formatTime(totalTime) {
	return `${Math.floor(totalTime / 3600)} hour${Math.floor(totalTime / 3600) !== 1 ? "s" : ""} and ${Math.floor((totalTime % 3600) / 60)} minute${Math.floor((totalTime % 3600) / 60) !== 1 ? "s" : ""}`;
}

export default function Leaderboard({ navigation }) {
	const [leaderboardData, setLeaderboardData] = useState([]);
	const userWritable = useUserInfo(false);
	let content = <ActivityIndicator size="large" color={colors.primary}/>;

	const update = () => { updateSelf(userWritable).then(setLeaderboardData) };

	useEffect(() => {
		update();
		// TODO: Sync more accurately using websockets
		const timer = setInterval(update, 30 * 1000); // 30-second interval
		return () => clearInterval(timer);
	}, [userWritable.userInfo.password]);

	if(leaderboardData) {
		content = <FlatList
			style={leaderboardStyles.list}
			scrollEventThrottle={16}
			data={leaderboardData}
			keyExtractor={item => item.id.toString()}
			renderItem={entry => {
				entry = entry.item;
				return (
					<View style={leaderboardStyles.member}>
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
		<Screen navigation={navigation}>
			{content}
		</Screen>
	);
}