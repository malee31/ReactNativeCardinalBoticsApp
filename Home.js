import {Image, StyleSheet, Text, View, Dimensions, Button} from 'react-native';
import React from "react"

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			signedIn: false
		};
		this.signInToggle = this.signInToggle.bind(this);
	}

	signInToggle() {
		this.setState({
			signedIn: !this.state.signedIn
		});
	}

	render() {
		return(
			<View style={{height: "100%", width: "100%"}}>
				<Image source={require("./assets/cardinalbotics_logo_white_clear.png")}
					resizeMode="contain"
					style={styles.largeLogoImage}/>
				<Button onPress={this.signInToggle}
					title={this.state.signedIn ? "Sign Out" : "Sign In"}
					style={styles.signInButton}/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	screen: {
		width: "100%",
		height: "100%",
		backgroundColor: "#eaeaea"
	},
	largeLogoImage: {
		width: "100%",
		maxHeight: "25%",
		marginVertical: 30
	},
	signInButton: {
		width: "80%",
		marginHorizontal: "10"
	}
});