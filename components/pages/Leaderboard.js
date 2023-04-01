import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import Screen, { screenPadding } from "../parts/StyledParts/ScreenWrappers";
import LeaderboardEntry from "../parts/StyledParts/LeaderboardEntry";
import useUserInfo from "../parts/ContextProviders/UserInfoProvider";
import { updateSelf } from "../parts/utils/serverClientWrapper";
import { Button } from "react-native-paper";
import config from "../../config.json";

const colors = config.colors;

const leaderboardStyles = StyleSheet.create({
	indicator: {
		marginTop: screenPadding.paddingTop
	},
	semiCenteredOuter: {
		height: "100%",
		paddingBottom: 30
	},
	semiCenteredInner: {
		height: "100%",
		display: "flex",
		justifyContent: "center"
	},
	list: {
		width: "100%",
		paddingHorizontal: 16,
		marginTop: screenPadding.paddingTop
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
	let content = <ActivityIndicator size="large" color={colors.primary} style={leaderboardStyles.indicator}/>;
	if(userWritable.userInfo.loaded && !userWritable.userInfo.loggedIn) {
		content = (
			<View style={leaderboardStyles.semiCenteredOuter}>
				<View style={leaderboardStyles.semiCenteredInner}>
					<Text>Remember to login first!</Text>
					<Button
						mode="elevated"
						onPress={() => setTimeout(() => navigation.navigate("Login"), 250)}
						style={{ marginTop: 12, backgroundColor: "#F0EFEF" }}
						labelStyle={{ minWidth: 60 }}
					>
						Login
					</Button>
				</View>
			</View>
		);
	}

	const update = () => {
		updateSelf(userWritable).then(setLeaderboardData)
	};

	useEffect(() => {
		update();
		// TODO: Sync more accurately using websockets
		const timer = setInterval(update, 30 * 1000); // 30-second interval
		return () => clearInterval(timer);
	}, [userWritable.userInfo.password]);

	if(leaderboardData) {
		content = (
			<FlatList
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
			/>
		);
	}

	return (
		<Screen disablePadding={true}>
			{content}
		</Screen>
	);
}