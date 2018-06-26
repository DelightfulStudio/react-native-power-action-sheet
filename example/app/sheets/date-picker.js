import DatePickerComponent from "../components/date-picker";

import { Button, Message, Separator, Title } from "react-native-power-action-sheet";

import React, { Component, Fragment } from "react";

class DatePicker extends Component {

    state = {
        date: null
    };


    render() {
        const { styles, close } = this.props;
        const { date } = this.state;

        return (
            <Fragment>
                <Title { ...this.props } top={ true } title="Pick your date"/>
                <Message { ...this.props }
                    message="This is an example how to implement a date picker inside action sheet"
                />
                <Separator { ...this.props }/>
                <DatePickerComponent
                    style={ styles.control }
                    date={ this.state.date || new Date() }
                    mode="datetime"
                    onDateChange={ date => this.setState( { date } ) }
                />
                <Separator { ...this.props }/>
                <Button
                    { ...this.props }
                    disabled={ !date }
                    onPress={ () => close( `${ date.toDateString()} ${date.toLocaleTimeString()}` ) }
                    bottom={ true }
                >
                    Accept
                </Button>
            </Fragment>
        );
    }
}


export default () => (
    {
        maxHeightRatio: 0.9,
        renderContent: ( props ) => ( <DatePicker { ...props }/> )
    }
);
