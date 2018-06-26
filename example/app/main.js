import ExampleWithView from "./example-with-view";
import ExampleWithProvider from "./example-with-provider";

import chainingSheetFactory from "./sheets/chaining";
import datePickerSheetFactory from "./sheets/date-picker";
import simpleChoicesSheetFactory from "./sheets/simple-choices";

import customStyles from "./custom-styles";

import React, { Component, Fragment } from "react";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        paddingTop: 20,
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "#f5fcff",
    },
} );

const Examples = ( props ) => (
    <Fragment>
        <ExampleWithView {...props}/>
        <ExampleWithProvider {...props}/>
    </Fragment>
);

export default class App extends Component {
    render() {
        return (
            <View style={ styles.container }>
                <Examples label={ "Simple Choices" } sheetFactory={ simpleChoicesSheetFactory }/>
                <ExampleWithView label={ "Date Picker" } sheetFactory={ datePickerSheetFactory }/>
                <ExampleWithView label={ "Chaining" } sheetFactory={ chainingSheetFactory }/>
                <ExampleWithView label={ "Custom Style" } sheetFactory={ simpleChoicesSheetFactory } styles={ customStyles } buttonUnderlayColor="purple"/>
            </View>
        );
    }
}
