import {StyleSheet} from "react-native";
import config from "../../config.json";

const styles = StyleSheet.create({
	masterContainer: {
		flex: 1
	},
	drawerHeading: {
		width: "100%",
		height: "20%",
		alignItems: 'flex-start',
		justifyContent: 'center'
	},
	drawerLogo: {
		width: "35%",
		height: "30%",
		maxHeight: "30%",
		borderRadius: 25
	},
	drawerText: {
		fontSize: 18,
		color: "#FFF",
		textAlign: "left",
		marginTop: 10,
		marginHorizontal: 15
	},
	drawerTimeIn: {
		fontSize: 16,
		color: "#FFF",
		textAlign: "left",
		marginHorizontal: 15
	},
	screen: {
		width: "100%",
		height: "100%",
		flex: 1,
		padding: "5%",
		paddingBottom: "8%",
		backgroundColor: config.colors.background,

	},
	largeLogoImage: {
		width: "100%",
		maxHeight: "25%",
		marginVertical: 30
	},
	signInButton: {
		alignItems: "center",
		justifyContent: "center",
		alignSelf: "center",
		backgroundColor: config.colors.gray,
		width: "70%",
		padding: "5%",
		marginVertical: 50,
	},
	signInText: {
		fontSize: 30
	},
	whatchuDoing: {
		color: "#7D1120",
		marginTop: 20,
	},
	content: {
		backgroundColor: 'white',
		padding: 22,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 4,
		borderColor: 'rgba(0, 0, 0, 0.1)',
	},
	watchuDoing: {
		maxHeight: 30
	},
	contentTitle: {
		fontSize: 20,
		marginBottom: 12,
	},
	formButton: {
		width: "100%",
		height: 45,
		flex: 1,
		justifyContent: 'space-between',
		alignContent: "center",
		flexDirection: 'row',
		paddingHorizontal: "5%",
		marginVertical: 10
	},
	formBtn: {
		width: "70%"
	},
	formText: {
		flex: 1,
		width: "30%",
		fontSize: 16,
		paddingHorizontal: 5,
		justifyContent: "center",
		alignContent: "center"
	},
	memberEntry: {
		width: "100%",
		height: 40,
		flex: 1,
		paddingHorizontal: 30,
	},
	calendarScreen: {
		paddingHorizontal: 0
	},
	calendarView: {
		minHeight: "45%"
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
	resourceButton: {
		width: "100%",
		height: 40,
		flex: 1,
		paddingHorizontal: 20,
		marginVertical: 10
	}
});

export default styles;