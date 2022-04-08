import { StyleSheet } from "react-native";
import { colors } from "../../config.json";

const styles = StyleSheet.create({
	drawerLogo: {
		width: "35%",
		height: "30%",
		maxHeight: "35%",
		borderRadius: 25
	},
	drawerText: {
		fontSize: 18,
		color: "#FFFFFF",
		textAlign: "left",
		marginTop: 10,
		marginHorizontal: 15
	},
	drawerTimeIn: {
		fontSize: 16,
		color: "#FFFFFF",
		textAlign: "left",
		marginHorizontal: 15
	},
	largeLogoImage: {
		width: "100%",
		height: "50%",
		alignSelf: "center",
	},
	signInInput: {
		color: "#7D1120",
		width: "70%",
	},
	loginButton: {
		alignItems: "center",
		justifyContent: "center",
		alignSelf: "center",
		backgroundColor: colors.gray,
		width: "70%",
		padding: "2%",
		marginVertical: "3%",
	},
	timeLogRow: {
		flexDirection: "column",
		width: "100%",
		backgroundColor: colors.gray,
		borderRadius: 10,
		padding: 5,
		marginVertical: "1%"
	},
	formButton: {
		width: "100%",
		minHeight: 45,
		flex: 1,
		justifyContent: 'space-around',
		alignItems: "flex-start",
		paddingHorizontal: "4%",
		marginVertical: 4
	},
	formText: {
		flex: 1,
		width: "30%",
		fontSize: 16,
		paddingHorizontal: 5,
		justifyContent: "center",
		alignContent: "center"
	},
	scroll: {
		maxHeight: "55%",
		padding: 15
	},
	text: {
		padding: 10,
		fontSize: 20,
		width: "100%",
		flex: 1,
		textAlign: 'center',
		alignSelf: "center"
	},
	title: {
		textAlign: 'center',
		alignSelf: 'center',
		width: "100%",
		fontSize: 30,
		color: colors.primary,
		marginTop: '5%',
	}
});

export default styles;