import DatePickerRenderer from "../components/date-picker-renderer";
import React from "react";

export default () => {
    const defaultDate = new Date();
    return {
        renderContent: DatePickerRenderer,
        title: "Pick a different date",
        message: "This is an example how to implement a date picker inside action sheet",
        selectTitle: "Accept",
        pickerOptions: {
            mode: "date"
        },
        date: defaultDate,
        validator: date => date.valueOf() !== defaultDate.valueOf(),
        handler: ( { close, value } ) => close( `${ value.toDateString()}` )
    };
};
