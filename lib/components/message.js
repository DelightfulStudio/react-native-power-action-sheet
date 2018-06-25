import React from "react";
import { Text, View } from "react-native";

export default ( props ) => {
    const { styles, top, bottom, message } = props;
    return message
        ? (
            <View style={ [ styles.control, top && styles.topBorder, bottom && styles.bottomBorder ] }>
                <Text style={ [ styles.message ] }>{ message }</Text>
            </View>
        )
        : null
};
