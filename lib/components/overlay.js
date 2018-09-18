import React from "react";
import { Animated, StyleSheet, Text } from "react-native";

export const styles = StyleSheet.create( {
    overlay: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "#000"
    },

    overlayInner: {
        top: 0,
        right: 0,
        height: "100%",
        width: "100%"
    }

} );


export default props => {

    const { opacity, onPress } = props;

    return (
        <Animated.View
            style={ [
                styles.overlay,
                {
                    opacity: opacity.interpolate( {
                        inputRange: [ 0, 1 ],
                        outputRange: [ 0, 0.4 ]
                    } )
                }
            ] }
        >
            <Text style={ styles.overlayInner } onPress={ onPress }/>
        </Animated.View>
    );

}
