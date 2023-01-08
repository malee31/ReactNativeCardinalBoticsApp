import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import LinkButton from "../parts/StyledParts/LinkButton.js";
import Screen from "../parts/StyledParts/ScreenWrapper";
import useModal from "../parts/ContextProviders/ModalProvider";
import { colors, urls } from "../../config.json";

const formStyles = StyleSheet.create({
	list: {
		width: "100%"
	},
	button: {
		width: "100%",
		minHeight: 45,
		flex: 1,
		justifyContent: "space-around",
		alignItems: "flex-start",
		paddingHorizontal: "4%",
		marginVertical: 4
	},
	text: {
		flex: 1,
		width: "30%",
		fontSize: 16,
		paddingHorizontal: 5,
		justifyContent: "center",
		alignContent: "center"
	},
	title: {
		width: "100%",
		alignSelf: "center",
		textAlign: "center",
		fontSize: 30,
		color: colors.primary,
		marginTop: "5%"
	}
});

export default function Forms({ navigation }) {
	const [data, setData] = useState([]);
	const modal = useModal();

	useEffect(() => {
		fetch(urls.sheet)
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

	let component = <ActivityIndicator size="large" color={colors.primary}/>;

	if(data) {
		component = <FlatList
			style={formStyles.list}
			data={data}
			keyExtractor={item => item[1] + ": " + item[2]}
			renderItem={entry => {
				entry = entry.item;
				if(typeof entry == "string") {
					return (<View style={formStyles.button}>
						<Text style={formStyles.title}>
							{entry}
						</Text>
					</View>);
				}

				const trimmed = entry[4].trim();

				return (<View style={formStyles.button}>
					{trimmed && trimmed.toLowerCase() !== "n/a" && (<Text style={formStyles.text}>
						Due {entry[4]}
					</Text>)}
					<LinkButton title={entry[1]} url={entry[2]}/>
				</View>);
			}}
		/>;
	}

	return (
		<Screen navigation={navigation}>
			{component}
		</Screen>
	);
}