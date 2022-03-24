import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import React from "react";

import Drawer from "./parts/Drawer.js";
import config from "../config.json";

export default function Base(props) {
	return (
		<PaperProvider theme={{
			...DefaultTheme,
			roundness: 2,
			colors: {
				...DefaultTheme.colors,
				primary: config.colors.primary,
				accent: config.colors.cardinalWhite
			},
		}} style={{ flex: 1 }}>
			<StatusBar animated hidden style="dark"/>
			<Drawer/>
		</PaperProvider>
	);
}