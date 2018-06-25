import { Button, Message, Separator, Title } from "react-native-power-action-sheet";

import React, { Component, Fragment } from "react";
import { Calendar } from "react-native-calendars";

class DatePicker extends Component {

    state = {
        date: null
    };


    render() {
        const { close } = this.props;
        const { date } = this.state;

        return (
            <Fragment>
                <Title { ...this.props } top={ true } title="Pick your date"/>
                <Message { ...this.props }
                    message="This is an example that shows how to implement a date picker inside action sheet"
                />
                <Separator {...this.props}/>
                <Calendar
                    onDayPress={ date => this.setState( { date } ) }
                    markedDates={ date ? { [ date.dateString ]: { selected: true, selectedColor: "blue" } } : null }
                />
                <Separator {...this.props}/>
                <Button
                    { ...this.props }
                    disabled={ !date }
                    onPress={ () => close( date.dateString ) }
                    bottom={ true }
                >
                    Select
                </Button>
            </Fragment>
        );
    }
}


export default () => (
    {
        maxHeightRatio: 1,
        renderContent: ( props ) => ( <DatePicker { ...props }/> )
    }
);
