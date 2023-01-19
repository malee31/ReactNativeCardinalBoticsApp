import "react-native-gesture-handler";
import React from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { UserInfoProvider } from "./components/parts/ContextProviders/UserInfoProvider";
import { ModalProvider } from "./components/parts/ContextProviders/ModalProvider";
import Modal from "./components/parts/StyledParts/ModalDisplayer";
import Drawer from "./components/parts/StyledParts/Drawer";
import config from "./config.json";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

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
					<Modal/>
				</PaperProvider>
			</ModalProvider>
		</UserInfoProvider>
	);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();