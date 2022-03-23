import {Image, Text, TouchableHighlight, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import React, { useState } from "react";
import config from "../config.json";
import Styles from "./parts/Styles";
import {bindActionCreators} from "redux";
import {setErrorMessage} from "./parts/reducerActions";
import {connect} from "react-redux";
import logo from "../assets/cardinalbotics_logo_white_clear.png";

function Login(props) {
	const [Id, setId] = useState("");
	const login = () => {
		props.setPassword(Id, () => {
			props.setErrorMessage("Verifying that you exist.");
		}).then(successText => {
			props.setErrorMessage(successText);
		}).catch(failText => {
			props.setErrorMessage(failText);
		});
	}

	return (
		<View style={Styles.screen}>
			<Image source={logo}
				resizeMode="contain"
				style={Styles.largeLogoImage}/>
			<TextInput
				label="Login"
				value={Id}
				style={Styles.whatchuDoing}
				onChange={newText => setId(newText.nativeEvent.text)}/>
			<TouchableHighlight onPress={login}
				activeOpacity={0.7}
				underlayColor={config.colors.darkGray}
				style={Styles.signInButton}>
				<View>
					<Text>Submit</Text>
				</View>
			</TouchableHighlight>
		</View>
	);
}

const mapDispatchToProps = dispatch => (
	bindActionCreators({
		setErrorMessage,
	}, dispatch)
);

export default connect(null, mapDispatchToProps)(Login);