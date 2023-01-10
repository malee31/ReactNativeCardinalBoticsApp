import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import Screen from "../parts/StyledParts/ScreenWrapper";
import LeaderboardEntry from "../parts/StyledParts/LeaderboardEntry";
import useUserInfo from "../parts/ContextProviders/UserInfoProvider";
import { updateSelf } from "../parts/utils/serverClientWrapper";
import { colors } from "../../config.json";

const leaderboardStyles = StyleSheet.create({
	list: {
		width: "100%",
		paddingHorizontal: 8
	},
	listContent: {
		alignSelf: "center",
		alignItems: "stretch",
		width: "100%",
		maxWidth: 600
	}
});

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
			contentContainerStyle={leaderboardStyles.listContent}
			scrollEventThrottle={16}
			data={leaderboardData.sort((a, b) => {
				if(a.signedIn !== b.signedIn) return b.signedIn - a.signedIn;

				return a.name.localeCompare(b.name)
			})}
			keyExtractor={item => item.id.toString()}
			renderItem={entry => {
				entry = entry.item;
				return (
					<LeaderboardEntry entry={entry}/>
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