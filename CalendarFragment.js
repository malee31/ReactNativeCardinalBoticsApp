import {Calendar} from 'react-native-calendars';
import {View} from 'react-native';
import config from "./config.json";
import React from "react";
import Icon from "./images/calendar.svg";

class CalendarFragment extends React.Component {
    static navigationOptions = {
        drawerLabel: 'CalendarFragment',
        drawerIcon: () => (
            <Icon
                width={30}
                height={30}
                fill={config.colors.secondary}
            />
        )
    }

    constructor(props) {
        super(props);
        this.state = {
            marked: {},
            isLoading: false
        };
    }

    componentDidMount() {
        fetch(config.urls.calendar)
            .then((response) => response.json())
            .then((json) => {
                json = json.items;
                this.setState({
                    data: json.values,
                    marked: {
                        '2020-05-15': {marked: true, dotColor: '#50cebb'},
                        '2020-05-16': {marked: true, dotColor: '#50cebb'},
                        '2020-05-21': {startingDay: true, color: '#50cebb', textColor: 'white'},
                        '2020-05-22': {color: '#70d7c7', textColor: 'white'},
                        '2020-05-23': {color: '#70d7c7', textColor: 'white', marked: true, dotColor: 'white'},
                        '2020-05-24': {color: '#70d7c7', textColor: 'white'},
                        '2020-05-25': {endingDay: true, color: '#50cebb', textColor: 'white'}
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
                <Calendar
                    markingType={'period'}
                    markedDates={
                        this.state.marked
                    }
                    onDayPress={(day) => {
                        console.warn(JSON.stringify(day))
                    }}
                />
            </View>
        );
    };
}

export default CalendarFragment;