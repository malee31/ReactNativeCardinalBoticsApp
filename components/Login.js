import {Image, Text, TouchableHighlight, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import React from "react";
import config from "../config.json";
import Styles from "./parts/Styles";
import {bindActionCreators} from "redux";
import {setErrorMessage} from "./parts/reducerActions";
import {connect} from "react-redux";

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			ID: ""
		};
		this.login = this.login.bind(this);
	}

	login() {
		this.props.setPassword(this.state.ID, () => {
			this.props.setErrorMessage("Verifying that you exist.");
		}).then(successText => {
			this.props.setErrorMessage(successText);
		}).catch(failText => {
			this.props.setErrorMessage(failText);
		});
	}

	render() {
		return (
			<View style={Styles.screen}>
				<Image source={require("../assets/cardinalbotics_logo_white_clear.png")}
					resizeMode="contain"
					style={Styles.largeLogoImage}/>
				<TextInput
					label="Login"
					value={this.state.ID}
					style={Styles.whatchuDoing}
					onChange={newText => this.setState({ID: newText.nativeEvent.text})}/>
				<TouchableHighlight onPress={this.login}
					activeOpacity={0.7}
					underlayColor={config.colors.darkGray}
					style={Styles.signInButton}>
					<View>
						<Text>Submit</Text>
					</View>
				</TouchableHighlight>
			</View>
		);
	};
}

const mapDispatchToProps = dispatch => (
	bindActionCreators({
		setErrorMessage,
	}, dispatch)
);

export default connect(null, mapDispatchToProps)(Login);