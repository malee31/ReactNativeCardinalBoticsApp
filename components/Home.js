import {FlatList, Image, Text, TouchableHighlight, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import React from "react";

import ModalPopUp from './parts/ModalPopUp.js';
import config from "../config.json";
import Styles from "./parts/Styles.js";

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			whatDid: "",
			error: false,
			errorMessage: "Welp, something went wrong.",
			isLoading: false,
			data: []
		};
		this.signInToggle = this.signInToggle.bind(this);
		this.updateSessions = this.updateSessions.bind(this);
	}

	componentDidMount() {
		this.updateSessions();
	}

	updateSessions() {
		this.props.getPassword().then(value => {
			// console.log("SESSION UPDATE!");
			fetch(config.serverEndpointBaseURLs.getUserData + encodeURI(`?password=${value}`))
				.then((response) => response.json())
				.then((json) => {
					this.setState({
						data: json["sessions"].reverse()
					});
					this.props.setSignInStatus(json.signedIn);
				})
				.catch((error) => console.error(error))
				.finally(() => {
					this.setState({isLoading: false});
				});
		}).catch(err => {
			this.setState({
				error: true,
				errorMessage: `Failed to get past sessions using your password\n\n${JSON.stringify(err)}`
			});
		});
	}

	signInToggle() {
		if (this.props.signedIn) {
			this.props.logout(this.state.whatDid).then(() => {
				this.setState({
					whatDid: ""
				});
				this.props.setSignInStatus(false);
				this.updateSessions();
			}).catch(failText => {
				this.setState({
					error: true,
					errorMessage: failText
				});
			});
		} else {
			this.props.login().then(res => {
				this.setState({
					whatDid: ""
				});

				this.updateSessions();
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
				<ModalPopUp show={() => {
					return this.state.error
				}} text={() => {
					return this.state.errorMessage
				}}
					onPress={() => {
						this.setState({error: false})
					}}/>
				{this.state.isLoading ? <Text> Loading </Text> : (
					<FlatList
						data={this.state.data}
						keyExtractor={(item) => `${item.date}: ${item.did}`}
						renderItem={(entry) => {
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
											<Text >{timeClocked}</Text>
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

export default Home;