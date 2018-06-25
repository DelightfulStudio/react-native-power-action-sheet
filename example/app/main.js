import ExampleWithView from "./example-with-view";
import ExampleWithProvider from "./example-with-provider";
import datePickerSheetFactory from "./sheets/date-picker";
import simpleChoicesSheetFactory from "./sheets/simple-choices";

import React, { Component, Fragment } from "react";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
    },
    instructions: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5,
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
                <Examples label={ "Date Picker" } sheetFactory={ datePickerSheetFactory }/>
            </View>
        );
    }
}
