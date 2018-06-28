import DatePicker from "./date-picker"
import { Button, Message, Separator, Title } from "react-native-power-action-sheet";

import React, { Component, Fragment } from "react";

export default class DatePickerSheet extends Component {

    state = {
        date: null
    };

    constructor( props ) {
        super( props );

        const { options } = props;
        this.state.date = options.date || new Date();
    }


    render() {
        const { styles, open, close, options } = this.props;
        const { title, message, selectTitle, pickerOptions, handler, validator } = options;
        const { date } = this.state;

        return (
            <Fragment>
                <Title { ...this.props } top={ true } title={ title || "Pick a date" }/>
                { message ? <Message { ...this.props } message={ message }/> : null }
                <Separator { ...this.props }/>
                <DatePicker
                    style={ styles.control }
                    date={ date }
                    { ...pickerOptions }
                    onDateChange={ date => this.setState( { date } ) }
                />
                <Separator { ...this.props }/>
                <Button
                    { ...this.props }
                    disabled={ validator && !validator( date ) }
                    onPress={ () => handler ? handler( { open, close, value: date } ) : close( date ) }
                    bottom={ true }
                >
                    { selectTitle ? selectTitle : "Select" }
                </Button>
            </Fragment>
        );
    }
}
