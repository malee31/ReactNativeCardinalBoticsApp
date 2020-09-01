import {Calendar, LocaleConfig} from 'react-native-calendars';
import {ScrollView, Text, View} from 'react-native';
import config from "../config.json";
import React from "react";
import moment from 'moment';

LocaleConfig.locales['en'] = {
	formatAccessibilityLabel: 'dddd d \'of\' MMMM \'of\' yyyy',
	monthNames: [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	],
	monthNamesShort: [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	],
	dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
};

LocaleConfig.defaultLocale = 'en';

class CalendarFragment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedEvent: "Click on an Event",
			marked: {},
			isLoading: false
		};
		this.handleCalendarClick = this.handleCalendarClick.bind(this);
	}

	componentDidMount() {
		fetch(config.urls.calendar)
			.then((response) => response.json())
			.then((json) => {
				json = json.items;
				let mark = {};
				/*{
					'2020-05-15': {marked: true, dotColor: '#50CEBB'},
					'2020-05-16': {marked: true, dotColor: '#50CEBB'},
					'2020-05-21': {startingDay: true, color: '#50CEBB', textColor: 'white'},
					'2020-05-22': {color: '#70D7C7', textColor: 'white'},
					'2020-05-23': {color: '#70D7C7', textColor: 'white', marked: true, dotColor: 'white'},
					'2020-05-24': {color: '#70D7C7', textColor: 'white'},
					'2020-05-25': {endingDay: true, color: '#50CEBB', textColor: 'white'}
				};*/
				for (let item = 0; item < json.length; item++) {
					let eventItem = json[item];
					let start = eventItem.start;
					let end = eventItem.end;
					let details = eventItem.summary;
					if (typeof start.date == "string") {
						start = start.date.split("-");
						end = end.date.split("-");
					} else {
						let time = moment(start.dateTime).unix() + 1;
						start = moment.unix(time).format('YYYY-MM-DD-HH-mm-ss').split("-");

						time = moment(end.dateTime).unix() + 1;
						end = moment.unix(time).format('YYYY-MM-DD-HH-mm-ss').split("-");

						console.log("\n" + start);
					}
					//start and end are now [year, month, day, hour(24hr), minutes, seconds, milliseconds + 1]
					const pad = num => num.length < 2 ? "0" + num : num;
					let startKey = `${start[0]}-${pad(start[1])}-${pad(start[2])}`;
					let endKey = `${end[0]}-${pad(end[1])}-${pad(end[2])}`;
					if(startKey === endKey) {
						mark[startKey] = {marked: true, dotColor: '#50CEBB'};
					}
				}
				this.setState({
					data: json.values,
					marked: mark
				});

			})
			.catch((error) => console.error(error))
			.finally(() => {
				this.setState({isLoading: false});
			});
	}

	handleCalendarClick() {
		let selected = this.state.marked[this.state.selectedEvent.dateString];
		if(selected) {
			return selected.dotColor;
		}
		return "No events on this date"
	}

	render() {
		return (
			<View>
				<View style={styles.calendarView}>
					<Calendar
						markingType={'period'}
						markedDates={
							this.state.marked
						}
						onDayPress={day => {
							this.setState({
								selectedEvent: day
							});
						}}
						theme={{
							calendarBackground: config.colors.darkGray
						}}
					/>
				</View>
				<ScrollView style={styles.scroll}>
					<Text style={styles.text}>
						{this.handleCalendarClick()}
					</Text>
				</ScrollView>
			</View>
		);
	};
}

const styles = {
	calendarView: {
		height: "40%",
		backgroundColor: config.colors.darkGray
	},
	scroll: {
		height: "60%",
		padding: 15,
		backgroundColor: config.colors.darkGray
	},
	text: {
		width: "100%",
		flex: 1,
		alignSelf: "flex-start"
	}
}

export default CalendarFragment;