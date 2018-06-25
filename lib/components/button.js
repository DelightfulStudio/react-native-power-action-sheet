import React from "react";
import { Text, TouchableHighlight } from "react-native";

export default ( { onPress, activeOpacity = 1, underlayColor, buttonStyle, labelStyle, children } ) => (
    <TouchableHighlight
        onPress={ onPress }
        activeOpacity={ activeOpacity }
        underlayColor={ underlayColor }
        style={ buttonStyle }
    >
        <Text style={ labelStyle }>{ children }</Text>
    </TouchableHighlight>
);
