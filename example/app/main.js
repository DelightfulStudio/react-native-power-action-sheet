import SimpleChoices from "./simple-choices";
import SimpleChoicesWithProvider from "./simple-choices-with-provider";

import React, { Component } from "react";
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

export default class App extends Component {
    render() {
        return (
            <View style={ styles.container }>
                <SimpleChoices/>
                <SimpleChoicesWithProvider/>
            </View>
        );
    }
}
