import React from "react";
import { Text, View } from "react-native";

export default ( props ) => {
    const { title, styles, top, bottom } = props;

    return title
        ? (
            <View style={ [ styles.control, top && styles.topBorder, bottom && styles.bottomBorder ] }>
                <Text style={ [ styles.title ] }>{ title }</Text>
            </View>
        )
        : null
};
