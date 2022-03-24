import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { UserInfoProvider } from "./components/parts/UserInfoProvider";
import { StatusBar } from 'expo-status-bar';
import Drawer from "./components/parts/Drawer.js";
import config from "./config.json";
import React from 'react';
import { ModalProvider } from "./components/parts/ModalProvider";

export default function App() {
	const paperTheme = {
		...DefaultTheme,
		roundness: 2,
		colors: {
			...DefaultTheme.colors,
			primary: config.colors.primary,
			accent: config.colors.cardinalWhite
		}
	};

	return (
		<UserInfoProvider>
			<ModalProvider>
				<PaperProvider theme={paperTheme} style={{ flex: 1 }}>
					<StatusBar animated hidden style="dark"/>
					<Drawer/>
				</PaperProvider>
			</ModalProvider>
		</UserInfoProvider>
	);
}