import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {FlatList, Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import LinkButton from "./LinkButton.js";
import config from "./config.json";
import React from "react";

class CalendarFragment extends React.Component {
    render() {
        return (
            <View >
                <Calendar
                    markingType={'period'}
                    markedDates={{
                        '2020-05-15': {marked: true, dotColor: '#50cebb'},
                        '2020-05-16': {marked: true, dotColor: '#50cebb'},
                        '2020-05-21': {startingDay: true, color: '#50cebb', textColor: 'white'},
                        '2020-05-22': {color: '#70d7c7', textColor: 'white'},
                        '2020-05-23': {color: '#70d7c7', textColor: 'white', marked: true, dotColor: 'white'},
                        '2020-05-24': {color: '#70d7c7', textColor: 'white'},
                        '2020-05-25': {endingDay: true, color: '#50cebb', textColor: 'white'},
                    }}
                />
            </View>
        );
    };
}
export default CalendarFragment;