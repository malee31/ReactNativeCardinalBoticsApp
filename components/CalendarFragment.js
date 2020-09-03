import {Calendar, LocaleConfig} from 'react-native-calendars';
import {ScrollView, Text, View} from 'react-native';
import config from "../config.json";
import React from "react";
import moment from 'moment';
import Styles from "./parts/Styles.js";

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
			selectedEvent: "Loading...",
			marked: {},
			allData: [],
			loadNum: 0
		};
		this.handleCalendarClick = this.handleCalendarClick.bind(this);
	}

	componentDidMount() {
		fetch(config.urls.calendar)
			.then((response) => response.json())
			.then((json) => {
				json = json.items;
				this.setState({
					allData: json
				});
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
					}

					//2020-08-17T16:30:00Z
					//["2020", "08", "17", "16", "30", "00"]
					//mark["2020-08-17"] = {marked: true, dotColor: '#50CEBB'}

					//start and end are now [year, month, day, hour(24hr), minutes, seconds, milliseconds + 1]
					//Relevant Variables: "details", start[""], end[""], pad(number), startkey"", endkey""
					const pad = num => num.length < 2 ? "0" + num : num;

					let startKey = `${start[0]}-${pad(start[1])}-${pad(start[2])}`;
					let endKey = `${end[0]}-${pad(end[1])}-${pad(end[2])}`;

					if (startKey == endKey) {
						mark[startKey] = {marked: true, dotColor: '#50CEBB'};
					} else {
						mark[startKey] = {startingDay: true, color: '#F0F', textColor: 'white'};
						mark[endKey] = {endingDay: true, color: '#F0F', textColor: 'white'};
					}
				}
				this.setState({
					data: json.values,
					marked: mark,
					loadNum: 1,
					selectedText: "Loaded. Click on an Event for more details"
				});

			})
			.catch((error) => console.error(error))
	}

	handleCalendarClick() {
		let selected = this.state.marked[this.state.selectedEvent.dateString];
		if (selected) {
			return selected.dotColor;
		}
		return "No events on this date"
	}

	render() {
		return (
			<View style={Styles.calendarScreen}>
				<View style={Styles.calendarView}>
					<Calendar
						key={`CalendarReload: ${this.state.loadNum}`}
						enableSwipeMonths={true}
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
				<ScrollView style={Styles.scroll}>
					<Text style={Styles.text}>
						{this.handleCalendarClick()}
					</Text>
				</ScrollView>
			</View>
		);
	};
}

export default CalendarFragment;