import DatePickerComponent from "../components/date-picker";

import { Button, Message, Separator, Title } from "react-native-power-action-sheet";

import React, { Component, Fragment } from "react";
import casual from "casual-browserify";

const message = "This is an example how to implement chaining action sheets";

const thirdSheet = ( result ) => (
    {
        title: "Make your third choice",
        message: message,
        choices: casual
            .array_of_words( casual.integer( 0, 7 ) )
            .map( choice => ( {
                label: choice,
                value: choice,
                handler: ( { close, value } ) => close( "\n" + [ result.firstChoice, result.secondChoice, value ].join( "\n" ) )
            } ) )
    }
);


class DatePicker extends Component {

    state = {
        date: null
    };

    render() {
        const { styles, open, result } = this.props;
        const { date } = this.state;

        return (
            <Fragment>
                <Title { ...this.props } top={ true } title="Make your second choice"/>
                <Message { ...this.props }
                    message={ message }
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
                    onPress={ () => open( thirdSheet( { ...result, secondChoice: `${ date.toDateString()} ${date.toLocaleTimeString()}` } ) ) }
                    bottom={ true }
                >
                    Accept
                </Button>
            </Fragment>
        );
    }
}


const secondSheet = ( result ) => (
    {
        maxHeightRatio: 0.9,
        renderContent: ( props ) => ( <DatePicker { ...props } result={ result }/> )
    }
);


export default () => (
    {
        title: "Make your first choice",
        message: message,
        choices: casual
            .array_of_words( casual.integer( 0, 7 ) )
            .map( choice => ( {
                label: choice,
                value: choice,
                handler: ( { open, value } ) => open( secondSheet( { firstChoice: value } ) )
            } ) )
    }
);
