import React from "react";
import { PanResponder, Platform, StyleSheet, View } from "react-native";
import MenuButton from "./MenuButton";
import config from "../../../config.json";
import { useNavigation } from "@react-navigation/native";

const colors = config.colors;

const { defaultScreenStyle } = StyleSheet.create({
	defaultScreenStyle: {
		width: "100%",
		height: "100%",
		flex: 1,
		padding: "5%",
		paddingTop: 48,
		backgroundColor: colors.background,
		alignItems: "center"
	}
});

export default function Screen({ children, additionalStyles }) {
	const navigation = useNavigation();
	const screenStyle = StyleSheet.compose(defaultScreenStyle, additionalStyles);
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

	return (
		<View style={screenStyle} {...(Platform.OS === "web" ? panResponder.panHandlers : {})}>
			{navigation && <MenuButton navigation={navigation}/>}
			{children}
		</View>
	);
}