import {Image, StyleSheet, Text, View, Dimensions} from 'react-native';
import React from "react"

export default class Home extends React.Component {
	render() {
		return(
			<View style={{height: "100%", width: "100%"}}>
				<Image source={require("./assets/cardinalbotics_logo_white_clear.png")}
						resizeMode="contain"
						style={styles.image}/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	screen: {
		width: "100%",
		height: "100%",
		backgroundColor: "#eaeaea",
	},
	image: {
		width: "100%",
		maxHeight: "25%",
	}
});