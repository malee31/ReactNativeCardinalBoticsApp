import "expo/build/Expo.fx"; // Warnings for accidental deep imports into react-native for react-native-web
import { AppRegistry, Platform } from "react-native";
import { createRoot } from "react-dom/client";
import { registerRootComponent } from "expo";
import App from "./App";

// Shimming web for React 18 instead of React 17 compatibility mode
if(Platform.OS === "web") {
	if(process.env.NODE_ENV === "production") {
		// TODO: Test build in production to see if this is necessary
		AppRegistry.registerComponent("main", () => App);
	}

	const root = createRoot(document.getElementById("root") ?? document.getElementById("main"));
	root.render(<App/>);
} else {
	// registerRootComponent calls AppRegistry.registerComponent("main", () => App);
	// It also ensures that whether you load the app in Expo Go or in a native build,
	// the environment is set up appropriately
	registerRootComponent(App);
}