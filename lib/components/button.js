import React from "react";
import { Text, TouchableHighlight } from "react-native";

export default ( {
    disabled = false,
    onPress,
    activeOpacity = 1,
    underlayColor,
    styles,
    buttonStyle,
    labelStyle,
    top,
    bottom,
    children
} ) => (
    <TouchableHighlight
        disabled={ disabled }
        onPress={ onPress }
        activeOpacity={ activeOpacity }
        underlayColor={ underlayColor }
        style={ [ styles.control, styles.button, top && styles.topBorder, bottom && styles.bottomBorder, buttonStyle ] }
    >
        <Text style={ [ styles.buttonLabel, labelStyle, disabled && styles.disabledButtonLabel ] }>{ children }</Text>
    </TouchableHighlight>
);
