import {Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import React from "react";
import config from "../config.json";

class Leaderboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			ID: "",
			signedIn: false,
			setData: props.setData
		};
		this.login = this.login.bind(this);
	}

	login() {
		this.state.setData("password", this.state.ID.trim());
		this.setState({
			ID: "",
		});
	}

	render() {
		return (
			<View style={styles.screen}>
				<Image source={require("../assets/cardinalbotics_logo_white_clear.png")}
					resizeMode="contain"
					style={styles.largeLogoImage}/>
				<TextInput
					label="Login"
					value={this.state.ID}
					style={styles.whatchuDoing}
					onChange={newText => this.setState({ID: newText.nativeEvent.text})}/>
				<TouchableHighlight onPress={this.login}
					activeOpacity={0.7}
					underlayColor={config.colors.darkGray}
					style={styles.signInButton}>
					<View>
						<Text>Submit</Text>
					</View>
				</TouchableHighlight>
			</View>
		);
	};
}

export default Leaderboard;
const styles = StyleSheet.create({
	screen: {
		width: "100%",
		height: "100%",
		flex: 1,
		paddingHorizontal: 30,
		paddingVertical:50,
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
	}
});