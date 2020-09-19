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
		paddingHorizontal: "5%",
		paddingVertical: "2%",
		backgroundColor: config.colors.background,

	},
	largeLogoImage: {
		width: "70%",
		alignSelf: "center",
		maxHeight: "25%"
	},
	signInButton: {
		alignItems: "center",
		justifyContent: "center",
		alignSelf: "center",
		backgroundColor: config.colors.gray,
		width: "70%",
		padding: "5%",
		marginVertical: "3%",
	},
	signInText: {
		fontSize: 30
	},
	whatchuDoing: {
		color: "#7D1120",
	},
	timeLogRow: {
		flexDirection: "column",
		width: "100%",
		textAlign: "left",
		backgroundColor: config.colors.gray,
		borderRadius: 10,
		padding: 5,
		marginVertical: "1%"
	},
	timeLogRowHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%"
	},
	timeLogRowDid: {
		width: "100%",
		paddingHorizontal: "2%"
	},
	content: {
		backgroundColor: 'white',
		padding: 22,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 4,
		borderColor: 'rgba(0, 0, 0, 0.1)',
	},
	contentTitle: {
		fontSize: 20,
		marginBottom: 12,
	},
	formButton: {
		width: "100%",
		minHeight: 45,
		flex: 1,
		justifyContent: 'space-between',
		alignItems: "flex-start",
		flexDirection: 'row',
		paddingHorizontal: "4%",
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
	title: {
		textAlign: 'center',
		alignSelf: 'center',
		width: "100%",
		fontSize: 30,
		color: config.colors.primary,
		marginTop: '5%',
	},
	logTime: {
		fontWeight: "bold",
	},
	resourceButton: {
		width: "100%",
		minHeight: 40,
		flex: 1,
		justifyContent: "center",
		alignItems: "flex-start",
		marginVertical: 10
	}
});

export default styles;