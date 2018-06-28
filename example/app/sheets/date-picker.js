import DatePickerSheet from "../components/date-picker-sheet";

export default () => {
    const defaultDate = new Date();
    return {
        sheetView: DatePickerSheet,
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
