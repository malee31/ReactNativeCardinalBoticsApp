import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { UserInfoProvider } from "./components/parts/UserInfoProvider";
import { ModalProvider } from "./components/parts/ModalProvider";
import Drawer from "./components/parts/Drawer.js";
import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import config from "./config.json";
import React from "react";

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