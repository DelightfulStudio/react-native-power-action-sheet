import React from "react";
import { StyleSheet, Text, TouchableHighlight } from "react-native";

const localStyle = StyleSheet.create( {
    button: {
        width: "100%",
        backgroundColor: "#38f",
    },
    label: {
        marginVertical: 15,
        marginHorizontal: 15,
        textAlign: "center",
        color: "#fff",
    },
} );

export default ( { label, onPress, buttonUnderlayColor, style = {} } ) => (
    <TouchableHighlight
        onPress={ onPress }
        buttonUnderlayColor={ buttonUnderlayColor }
        style={ [ localStyle.button, style.button ] }
    >
        <Text style={ [ localStyle.label, style.label ] }>{label}</Text>
    </TouchableHighlight>
);
