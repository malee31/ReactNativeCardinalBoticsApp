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
	const name = `${entry.first_name} ${entry.last_name}`;
	const signedIn = entry.session && !entry.session.endTime;

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
					Total: {formatTime(entry.totalTime / 1000)}{signedIn && ` (+${formatTime(entry.timeIn / 1000)})`}
				</Text>
			</View>
		</View>
	);
}