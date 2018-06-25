import React from "react";
import { Text, TouchableHighlight } from "react-native";

export default ( { label, onPress, buttonUnderlayColor, styles = {} } ) => (
    <TouchableHighlight
        onPress={ onPress }
        buttonUnderlayColor={ buttonUnderlayColor }
        style={ [ styles.button ] }
    >
        <Text style={ [ styles.buttonLabel ] }>{label}</Text>
    </TouchableHighlight>
);
