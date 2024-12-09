import React from "react";
import { StyleSheet, Text, View } from "react-native";
import config from "../../../config.json";

const colors = config.colors;

const leaderboardEntryStyles = StyleSheet.create({
	member: {
		flexDirection: "column",
		width: "100%",
		minHeight: 48,
		backgroundColor: colors.gray,
		borderRadius: 4,
		marginVertical: 4,
		overflow: "hidden"
	},
	indicator: {
		position: "absolute",
		backgroundColor: colors.darkGray,
		top: 0,
		left: 0,
		width: 8,
		height: "100%"
	},
	entryContent: {
		paddingHorizontal: 8,
		paddingVertical: 8,
		paddingLeft: 16,
	},
	memberName: {
		fontSize: 18
	}
});

function formatTime(totalTime) {
	return `${Math.floor(totalTime / 3600)} hour${Math.floor(totalTime / 3600) !== 1 ? "s" : ""} and ${Math.floor((totalTime % 3600) / 60)} minute${Math.floor((totalTime % 3600) / 60) !== 1 ? "s" : ""}`;
}

export default function LeaderboardEntry({ entry }) {
	const name = entry.name;
	const signedIn = entry.signedIn;
	const timeIn = signedIn ? (Date.now() - entry.session.startTime) / 1000 : 0;
	const timeTotal = entry.total_sessions / 1000 + timeIn;

	return (
		<View style={leaderboardEntryStyles.member}>
			<View style={[leaderboardEntryStyles.indicator, {
				backgroundColor: signedIn ? "green" : colors.darkGray
			}]}/>
			<View style={leaderboardEntryStyles.entryContent}>
				<Text
					style={[leaderboardEntryStyles.memberName, {
						color: signedIn ? "green" : "black",
					}]}
				>
					{name}
				</Text>
				<Text>
					{signedIn ? (
						`[Signed In: ${formatTime(timeIn)}] `
					) : (
						"[Signed Out] "
					)}
					Total: {formatTime(timeTotal)}
				</Text>
			</View>
		</View>
	);
}
