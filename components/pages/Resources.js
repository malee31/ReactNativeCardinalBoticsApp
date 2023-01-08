import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import Screen from "../parts/StyledParts/ScreenWrapper";
import LinkButton from "../parts/StyledParts/LinkButton.js";
import useModal from "../parts/ContextProviders/ModalProvider";
import { colors, urls } from "../../config.json";

const { listStyle } = StyleSheet.create({
	listStyle: {
		width: "100%"
	}
});

export default function Resources({ navigation }) {
	const [data, setData] = useState([]);
	const modal = useModal();

	useEffect(() => {
		fetch(urls.resources)
			.then(response => response.json())
			.then(json => setData(json.values))
			.catch(err => modal.showMessage(`Unable to load resources: ${err}`));
	}, []);

	let component = <ActivityIndicator size="large" color={colors.primary}/>;

	if(data) {
		component = <FlatList
			style={listStyle}
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
		/>;
	}

	return (
		<Screen navigation={navigation}>
			{component}
		</Screen>
	);
}