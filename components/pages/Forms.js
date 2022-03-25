import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import LinkButton from "../parts/LinkButton.js";
import config from "../../config.json";
import React, { useEffect, useState } from "react";
import Styles from "../parts/Styles.js";
import MenuButton from "../parts/MenuButton";
import useModal from "../parts/ModalProvider";

export default function Forms({ navigation }) {
	const [data, setData] = useState([]);
	const modal = useModal();

	useEffect(() => {
		fetch(config.urls.sheet)
			.then(response => response.json())
			.then(json => json.values)
			.then(values => {
				for(let sheetRow = 0; sheetRow < values.length; sheetRow++) {
					if(sheetRow === 0 || values[sheetRow][0].trim() !== values[sheetRow - 1][0].trim()) {
						// Extracts headers from rows
						values.splice(sheetRow, 0, values[sheetRow][0].trim());
						sheetRow++;
					}
				}
				setData(values);
			})
			.catch(err => modal.showMessage(`Unable to load forms: ${err}`));
	}, []);

	let component = <ActivityIndicator size="large" color={config.colors.primary}/>;

	if(data) {
		component = <FlatList
			data={data}
			keyExtractor={item => item[1] + ": " + item[2]}
			renderItem={entry => {
				entry = entry.item;
				if(typeof entry == "string") {
					return (
						<View style={Styles.formButton}>
							<Text style={Styles.title}>
								{entry}
							</Text>
						</View>
					);
				}

				const trimmed = entry[4].trim();

				return (
					<View style={Styles.formButton}>
						{trimmed && trimmed.toLowerCase() !== "n/a" && (
							<Text style={Styles.formText}>
								Due {entry[4]}
							</Text>
						)}
						<LinkButton
							style={[Styles.resourceButton, Styles.formBtn]}
							title={entry[1]} url={entry[2]}
						/>
					</View>
				);
			}}
		/>;
	}

	return (
		<View style={Styles.screen}>
			<MenuButton navigation={navigation}/>
			{component}
		</View>
	);
}