import React from "react";
import { PanResponder, Platform, ScrollView, StyleSheet, View } from "react-native";
import MenuButton from "./MenuButton";
import config from "../../../config.json";
import { useNavigation } from "@react-navigation/native";

const colors = config.colors;

const screenWrapperStyles = StyleSheet.create({
	defaultScreen: {
		width: "100%",
		height: "100%",
		flex: 1,
		backgroundColor: colors.background,
		alignItems: "center",
	},
	defaultScreenPadding: {
		padding: "5%",
		paddingTop: 48,
		paddingBottom: 36,
	},
	screenScrollStyle: {
		display: "flex",
		width: "100%",
		height: "100%",
		flexGrow: 0,
	},
	// Restricts the max width of the screen
	mobileScreen: {
		width: "100%",
		maxWidth: 600
	},
	mobileCenter: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	mobileScrollCenter: {
		flexGrow: 0
	}
});

export const screenPadding = screenWrapperStyles.defaultScreenPadding;

function useDrawerPanhandlers() {
	const navigation = useNavigation();
	const panResponder = React.useRef(
		PanResponder.create({
			onMoveShouldSetPanResponder: () => true,
			onPanResponderTerminationRequest: () => true,
			onShouldBlockNativeResponder: () => true,
			onPanResponderRelease: (evt, gestureState) => {
				if(Math.abs(gestureState.dx) < Math.abs(gestureState.dy)) return;
				if(gestureState.dx > 20 && gestureState.vx > 0.1) {
					navigation.openDrawer();
				}
			}
		})
	).current;

	// Disable panhandler on mobile
	if(Platform.OS !== "web") {
		return {};
	}

	return panResponder.panHandlers;
}

export default function Screen({ children, disablePadding = false, additionalStyles, ...extraProps }) {
	let screenStyle = screenWrapperStyles.defaultScreen;
	if(!disablePadding) {
		screenStyle = [screenStyle, screenWrapperStyles.defaultScreenPadding];
	}
	screenStyle = [screenStyle, additionalStyles].flat();
	const drawerPanhandlers = useDrawerPanhandlers();

	return (
		<View
			{...extraProps}
			style={screenStyle}
			{...drawerPanhandlers}
		>
			<MenuButton/>
			{children}
		</View>
	);
}

export function ScreenScrollable({ children, disablePadding = false, additionalStyles, ...extraProps }) {
	let screenStyle = screenWrapperStyles.defaultScreen;
	if(!disablePadding) {
		screenStyle = [screenStyle, screenWrapperStyles.defaultScreenPadding];
	}
	screenStyle = [screenStyle, additionalStyles].flat();

	return (
		<Screen
			disablePadding={true}
			{...extraProps}
		>
			<ScrollView
				style={screenWrapperStyles.screenScrollStyle}
				contentContainerStyle={screenStyle}
			>
				{children}
			</ScrollView>
		</Screen>
	);
}

export function MobileScreen({ children, disablePadding = false, centered = false, ...extraProps }) {
	return (
		<Screen disablePadding={disablePadding}>
			<MobileView
				centered={centered}
				{...extraProps}
			>
				{children}
			</MobileView>
		</Screen>
	);
}


export function MobileScreenScrollable({ children, centered = false, disablePadding = false, ...extraProps }) {
	return (
		<ScreenScrollable disablePadding={disablePadding}>
			<MobileView
				centered={centered}
				{...extraProps}
			>
				{children}
			</MobileView>
		</ScreenScrollable>
	);
}

function MobileView({ children, style, centered = false, ...extraProps }) {
	let mobileViewStyles = screenWrapperStyles.mobileScreen;
	if(centered) {
		mobileViewStyles = [mobileViewStyles, screenWrapperStyles.mobileCenter];
	}
	mobileViewStyles = [mobileViewStyles, style].flat();

	return (
		<View
			style={mobileViewStyles}
			{...extraProps}
		>
			{children}
		</View>
	);
}