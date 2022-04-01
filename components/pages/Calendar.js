import { Calendar, LocaleConfig } from 'react-native-calendars';
import { ScrollView, Text, View } from 'react-native';
import { colors, urls } from "../../config.json";
import React, { useEffect, useState } from "react";
import moment from 'moment';
import Styles from "../parts/Styles.js";
import MenuButton from "../parts/MenuButton";

LocaleConfig.locales['en'] = {
	formatAccessibilityLabel: 'dddd d \'of\' MMMM \'of\' yyyy',
	monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
};

LocaleConfig.defaultLocale = 'en';

export default function CalendarComponent({ navigation }) {
	const [data, setData] = useState([]);
	const [selectedText, setSelectedText] = useState("Loading...");
	const [selectedEvent, setSelectedEvent] = useState({});
	const [marked, setMarked] = useState({});
	const [loadNum, setLoadNum] = useState(0);

	useEffect(() => {
		fetch(urls.calendar)
			.then(response => response.json())
			.then(json => json.items)
			.then(json => {
				const mark = {};
				/*{
					'2020-05-15': {marked: true, dotColor: '#50CEBB'},
					'2020-05-16': {marked: true, dotColor: '#50CEBB'},
					'2020-05-21': {startingDay: true, color: '#50CEBB', textColor: 'white'},
					'2020-05-22': {color: '#70D7C7', textColor: 'white'},
					'2020-05-23': {color: '#70D7C7', textColor: 'white', marked: true, dotColor: 'white'},
					'2020-05-24': {color: '#70D7C7', textColor: 'white'},
					'2020-05-25': {endingDay: true, color: '#50CEBB', textColor: 'white'}
				};*/

				for(const eventItem of json) {
					// const details = eventItem.summary;
					let start = eventItem.start;
					let end = eventItem.end;
					if(typeof start.date == "string") {
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

					if(startKey === endKey) {
						mark[startKey] = { marked: true, dotColor: '#50CEBB' };
					} else {
						mark[startKey] = { startingDay: true, color: '#FF00FF', textColor: 'white' };
						mark[endKey] = { endingDay: true, color: '#FF00FF', textColor: 'white' };
					}
				}
				setData(json);
				setMarked(mark);
				setLoadNum(1);
				setSelectedText("Loaded. Click on an Event for more details");
			})
			.catch(console.error);
	}, []);

	const handleCalendarClick = () => {
		const selected = marked[selectedEvent.dateString];
		if(selected) {
			return selected.dotColor;
		}
		return "No events on this date";
	}

	return (
		<View style={[Styles.screen, Styles.calendarScreen]}>
			<MenuButton navigation={navigation}/>
			<View style={Styles.calendarView}>
				<Calendar
					key={`CalendarReload: ${loadNum}`}
					enableSwipeMonths={true}
					markingType={'period'}
					markedDates={
						marked
					}
					onDayPress={day => {
						setSelectedEvent(day);
					}}
					theme={{
						calendarBackground: colors.darkGray
					}}
				/>
			</View>
			<ScrollView style={Styles.scroll}>
				<Text style={Styles.text}>
					{handleCalendarClick()}
				</Text>
			</ScrollView>
		</View>
	);
};