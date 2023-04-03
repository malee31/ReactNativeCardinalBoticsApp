import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text } from "react-native";
import Screen, { screenPadding } from "../parts/StyledParts/ScreenWrappers";
import LinkButton from "../parts/StyledParts/LinkButton.js";
import useModal from "../parts/ContextProviders/ModalProvider";
import config from "../../config.json";

const colors = config.colors;
const urls = config.urls;

const resourceStyles = StyleSheet.create({
	title: {
		fontSize: 30,
		textAlign: "center",
		marginTop: screenPadding.paddingTop,
		marginBottom: 4
	},
	list: {
		width: "100%",
		paddingHorizontal: 16,
	},
	listContent: {
		alignSelf: "center",
		alignItems: "stretch",
		width: "100%",
		maxWidth: 600
	}
});

export default function Resources() {
	const [data, setData] = useState([]);
	const modal = useModal();

	useEffect(() => {
		fetch(urls.resources)
			.then(response => response.json())
			.then(json => setData(json.values))
			.catch(err => modal.showMessage(`Unable to load resources: ${err}`));
	}, []);

	let component = <ActivityIndicator size="large" color={colors.primary}/>;

	if(!data) {
		return (
			<Screen>
				{component}
			</Screen>
		);
	}

	return (
		<Screen disablePadding={true}>
			<Text style={resourceStyles.title}>Resources</Text>
			<FlatList
				style={resourceStyles.list}
				contentContainerStyle={resourceStyles.listContent}
				data={data}
				keyExtractor={item => item[0] + ": " + item[1]}
				renderItem={(entry) => {
					entry = entry.item;
					return (
						<LinkButton
							title={entry[0]}
							url={entry[1]}
							icon={entry[2]}
						/>
					);
				}}
			/>
		</Screen>
	);
}