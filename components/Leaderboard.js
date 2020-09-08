import {FlatList, Text, View} from 'react-native';
import config from "../config.json";
import React from "react";
import Styles from "./parts/Styles.js";

export default class Leaderboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: [],
			loadCount: 0,
			interval: null
		};
		this.updateData = this.updateData.bind(this);
		this.updateScroll = this.updateScroll.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
		this.flatListRef = null;
		this.scrollY = 0;
	}

	componentDidMount() {
		this.updateData();
		if (typeof this.state.interval !== "number") {
			this.setState({
				interval: setInterval(this.updateData, 5000)
			});
			// console.log("UPDATED TIMER FOR LEADERBOARD. If this runs twice... Oh no.")
		}
	}

	updateData() {
		fetch(config.serverEndpointBaseURLs.getData)
			.then((response) => response.json())
			.then((json) => {
				json.forEach((elem, index) => {
					elem.key = "Leaderboard #" + (index + 1);
				});
				json.sort((a, b) => {
					if (a.username < b.username) {
						return -1;
					}
					if (a.username > b.username) {
						return 1;
					}
					return 0;
				}).sort((a, b) => {
					return b.totalTime - a.totalTime;
				}).sort((a, b) => {
					return b.signedIn - a.signedIn;
				});
				this.setState({userData: json});
			})
			.catch((error) => console.error(error))
			.finally(() => {
				this.setState({loadCount: this.state.loadCount + 1});
			});
		this.updateScroll();
	}

	updateScroll() {
		if (this.flatListRef) this.flatListRef.scrollToOffset({animated: false, offset: this.scrollY});
	}

	handleScroll(event) {
		this.scrollY = event.nativeEvent.contentOffset.y;
	}

	render() {
		return (
			<View style={Styles.screen}>
				{this.state.loadCount === 0 ? <Text> Loading </Text> : (
					<FlatList
						ref={ref => {
							this.flatListRef = ref;
						}}
						scrollEventThrottle={16}
						onScroll={this.handleScroll}
						onScrollAnimationEnd={this.handleScroll}
						data={this.state.userData}
						// key={"Leaderboard: " + this.state.loadCount}
						keyExtractor={item => item.key}
						renderItem={(entry) => {
							entry = entry.item;
							let timeClocked = `${Math.floor(entry.totalTime / 3600)} hour`;
							if (Math.floor(entry.totalTime / 3600) !== 1) {
								timeClocked += "s";
							}
							timeClocked += ` and ${Math.floor((entry.totalTime % 3600) / 60)} minute${Math.floor((entry.totalTime % 3600) / 60) !== 1 ? "s" : ""}`;
							return (
								<View style={Styles.memberEntry}>
									<Text style={{
										color: entry.signedIn ? "green" : "black",
										fontSize: 16
									}}>{`${entry.username}: ${timeClocked}`}</Text>
								</View>
							);
						}}
					/>
				)}
			</View>
		);
	}
}