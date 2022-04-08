import { ActivityIndicator, FlatList } from 'react-native';
import LinkButton from "../parts/StyledParts/LinkButton.js";
import { colors, urls } from "../../config.json";
import React, { useEffect, useState } from "react";
import useModal from "../parts/ContextProviders/ModalProvider";
import Screen from "../parts/StyledParts/ScreenWrapper";


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