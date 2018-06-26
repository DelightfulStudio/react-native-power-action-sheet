import { Button, DatePickerRenderer, Message, Separator, Title } from "react-native-power-action-sheet";

import React, { Component, Fragment } from "react";
import casual from "casual-browserify";

const message = "This is an example how to implement chaining action sheets";

const thirdSheet = ( result ) => (
    {
        title: "Make your third choice",
        message: message,
        choices: casual
            .array_of_words( casual.integer( 1, 7 ) )
            .map( choice => ( {
                label: choice,
                value: choice,
                handler: ( { close, value } ) => close( "\n" + [ result.firstChoice, result.secondChoice, value ].join( "\n" ) )
            } ) )
    }
);


const secondSheet = ( result ) => (
    {
        renderContent: DatePickerRenderer,
        title: "Make your second choice",
        message,
        pickerOptions: {
            mode: "datetime"
        },
        handler: ( { open, value } ) => open( thirdSheet( {
            ...result,
            secondChoice: `${ value.toDateString()} ${value.toLocaleTimeString()}`
        } ) ),
    }
);


export default () => (
    {
        title: "Make your first choice",
        message: message,
        choices: casual
            .array_of_words( casual.integer( 1, 7 ) )
            .map( choice => ( {
                label: choice,
                value: choice,
                handler: ( { open, value } ) => open( secondSheet( { firstChoice: value } ) )
            } ) )
    }
);
