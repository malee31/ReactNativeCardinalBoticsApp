import {Calendar, LocaleConfig} from 'react-native-calendars';
import {ScrollView, Text, View} from 'react-native';
import config from "../config.json";
import React from "react";
import Icon from "../images/calendar.svg";
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
	}

    componentDidMount() {
        fetch(config.urls.calendar)
            .then((response) => response.json())
            .then((json) => {
                json = json.items;
                let mark = {}
                for (let item = 0; item < json.length; item++) {
                    let event = {marked: true}
                    let time = moment()
                }
                this.setState({
                    data: json.values,
                    marked: {
                        '2020-05-15': {marked: true, dotColor: '#50CEBB'},
                        '2020-05-16': {marked: true, dotColor: '#50CEBB'},
                        '2020-05-21': {startingDay: true, color: '#50CEBB', textColor: 'white'},
                        '2020-05-22': {color: '#70D7C7', textColor: 'white'},
                        '2020-05-23': {color: '#70D7C7', textColor: 'white', marked: true, dotColor: 'white'},
                        '2020-05-24': {color: '#70D7C7', textColor: 'white'},
                        '2020-05-25': {endingDay: true, color: '#50CEBB', textColor: 'white'}
                    }
                });

            })
            .catch((error) => console.error(error))
            .finally(() => {
                this.setState({isLoading: false});
            });
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
                                selectedEvent: JSON.stringify(day)
                            });
                        }}
                        theme={{
                            calendarBackground: config.colors.darkGray
                        }}
                    />
                </View>
                <ScrollView style={styles.scroll}>
                    <Text style={styles.text}>
                        {this.state.selectedEvent}
                    </Text>
                </ScrollView>
            </View>
        );
    };
}

const styles = {
    calendarView: {
        height: "50%",
        backgroundColor: config.colors.darkGray
    },
    scroll: {
        height: "50%",
        padding: 15,
        backgroundColor: config.colors.gray
    },
    text: {
        width: "100%",
        flex: 1,
        alignSelf: "flex-start"
    }
}

export default CalendarFragment;