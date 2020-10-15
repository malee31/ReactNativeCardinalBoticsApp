import {ActivityIndicator, FlatList, Image, Text, TouchableHighlight, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import React from "react";

import ModalPopUp from './parts/ModalPopUp.js';
import config from "../config.json";
import Styles from "./parts/Styles.js";

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {sessionUpdate} from './parts/reducerActions';


class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			whatDid: "",
			error: false,
			errorMessage: "Welp, something went wrong."
		};
		this.signInToggle = this.signInToggle.bind(this);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return this.props.signedIn !== nextProps.signedIn || this.state.error !== nextState.error
			|| this.state.whatDid !== nextState.whatDid || this.state.errorMessage !== nextState.errorMessage
			|| this.props.sessions.length !== nextProps.sessions.length || true;

	}

	signInToggle() {
		if (this.props.signedIn) {
			this.props.logout(this.state.whatDid).then(() => {
				this.setState({
					whatDid: ""
				});
			}).catch(failText => {
				this.setState({
					error: true,
					errorMessage: failText
				});
			});
		} else {
			this.props.login().then(() => {
				this.setState({
					whatDid: ""
				});
			}).catch(failText => {
				this.setState({
					error: true,
					errorMessage: failText
				});
			});
		}
	}

	render() {
		return (
			<View style={Styles.screen}>
				<Image source={require("../assets/cardinalbotics_logo_white_clear.png")}
					resizeMode="contain"
					style={Styles.largeLogoImage}/>
				{/*<TouchableHighlight onPress={this.signInToggle}*/}
				<TouchableHighlight onPress={() => {
					this.props.sessionUpdate(1)
				}}
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
				<ModalPopUp show={() => {
					return this.state.error
				}} text={() => {
					return this.state.errorMessage
				}}
					onPress={() => {
						this.setState({error: false})
					}}/>
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
										this.setState({error: true, errorMessage: entry.did})
									}}
									style={Styles.timeLogRow}>
									<View>
										<View style={Styles.timeLogRowHeader}>
											<Text style={Styles.logTime}>{` ${entry.day} `}</Text>
											<Text style={(entry.flagged ? {color: "#D00"} : {})}>{timeClocked}</Text>
										</View>
										<Text numberOfLines={1} style={Styles.timeLogRowDid}>{entry.did}</Text>
										<Text>{this.props.reducer1.possible[this.props.reducer1.current]}</Text>
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

const stateMap = state => {
	const {reducer1} = state;
	return {reducer1};
};

const mapDispatchToProps = dispatch => (
	bindActionCreators({
		sessionUpdate,
	}, dispatch)
);

export default connect(stateMap, mapDispatchToProps)(Home);