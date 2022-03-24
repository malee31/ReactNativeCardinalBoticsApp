import {ActivityIndicator, FlatList, Image, Text, TouchableHighlight, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import React from "react";

import config from "../../config.json";
import Styles from "../parts/Styles.js";

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setErrorMessage} from './parts/reducerActions';


class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			whatDid: ""
		}
		this.signInToggle = this.signInToggle.bind(this);
	}

	signInToggle() {
		if (this.props.signedIn) {
			this.props.logout(this.state.whatDid).then(() => {
				this.setState({
					whatDid: ""
				});
			}).catch(failText => {
				this.props.setErrorMessage(failText);
			});
		} else {
			this.props.login().then(() => {
				this.setState({
					whatDid: ""
				});
			}).catch(failText => {
				this.props.setErrorMessage(failText);
			});
		}
	}

	render() {
		return (
			<View style={Styles.screen}>
				<Image source={require("../../assets/cardinalbotics_logo_white_clear.png")}
					resizeMode="contain"
					style={Styles.largeLogoImage}/>
				<TouchableHighlight onPress={this.signInToggle}
					activeOpacity={0.7}
					underlayColor={config.colors.darkGray}
					style={Styles.signInButton}>
					<View>
						<Text style={{
							color: this.props.signedIn ? "red" : "green",
							fontSize: 30,
							fontWeight: "bold"
						}}>{this.props.signedIn ? "Sign Out" : "Sign In"}</Text>
					</View>
				</TouchableHighlight>
				{this.props.signedIn ? <TextInput
					label="What did you do while signed in?"
					value={this.state.whatDid}
					style={Styles.whatchuDoing}
					onChange={newText => this.setState({whatDid: newText.nativeEvent.text})}
				/> : <View/>}
				{this.props.sessions.length === 0 ? (
					<ActivityIndicator size="large" color={config.colors.primary}/>
				) : (
					<FlatList
						data={this.props.sessions}
						keyExtractor={item => `${item.date}: ${item.did}`}
						renderItem={entry => {
							entry = entry.item;
							let timeClocked = `${Math.floor(entry.time / 3600)} hr`;
							if (Math.floor(entry.time / 3600) !== 1) {
								timeClocked += "s";
							}
							timeClocked += ` ${Math.floor((entry.time % 3600) / 60)} min${Math.floor((entry.time % 3600) / 60) !== 1 ? "s" : ""}`;

							if (entry.time < 60) timeClocked = `${entry.time} second${entry.time !== 1 ? "s" : ""}`;
							return (
								<TouchableHighlight
									activeOpacity={0.7}
									underlayColor={config.colors.darkGray}
									onPress={() => {
										this.props.setErrorMessage(entry.did)
									}}
									style={Styles.timeLogRow}>
									<View>
										<View style={Styles.timeLogRowHeader}>
											<Text style={Styles.logTime}>{` ${entry.day} `}</Text>
											<Text style={(entry.flagged ? {color: "#D00"} : {})}>{timeClocked}</Text>
										</View>
										<Text numberOfLines={1} style={Styles.timeLogRowDid}>{entry.did}</Text>
									</View>
								</TouchableHighlight>
							);
						}}
					/>
				)}
			</View>
		);
	};
}

const mapDispatchToProps = dispatch => (
	bindActionCreators({
		setErrorMessage,
	}, dispatch)
);

export default connect(null, mapDispatchToProps)(Home);