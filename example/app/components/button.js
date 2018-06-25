import React from "react";
import { Text, TouchableHighlight } from "react-native";

export default ( { label, onPress, styles = {} } ) => (
    <TouchableHighlight
        onPress={ onPress }
        underlayColor="#77ACFF"
        style={ [ styles.button ] }
    >
        <Text style={ [ styles.buttonLabel ] }>{label}</Text>
    </TouchableHighlight>
);
