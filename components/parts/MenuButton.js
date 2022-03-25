import React from "react";
import config from "../../config.json";
import { Button } from 'react-native-paper';

export default function MenuButton({ navigation }) {
	return (
		<Button
			icon="menu"
			mode="contained"
			color={config.colors.secondary}
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				borderTopLeftRadius: 0,
				borderTopRightRadius: 0,
				borderBottomLeftRadius: 0,
				zIndex: 1
			}}
			onPress={navigation.toggleDrawer}
		>
			Menu
		</Button>
	);
}