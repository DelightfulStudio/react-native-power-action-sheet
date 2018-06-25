import Button from "./components/button";
import simpleChoicesSheetFactory from "./sheets/simple-choices";

import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import { PowerActionSheet, ChoicesRenderer } from "react-native-power-action-sheet";

const localStyle = StyleSheet.create( {

    selected: {
        paddingVertical: 15,
        textAlign: "center",
        color: "grey"
    }
} );


class SimpleChoices extends Component {

    actionSheetRef = React.createRef();
    state = {
        selected: null
    };

    showActionSheet = () => {
        this.actionSheetRef.open( {
            ...simpleChoicesSheetFactory(),
            onClose: selected => { this.setState( { selected } ) }
        } );
    };

    render() {
        const { selected } = this.state;
        return (
            <View>
                <Button label="Standard Choices" onPress={ this.showActionSheet } style={ { button: { width: 250 } } }/>
                <Text style={ localStyle.selected }>{ selected ? `You selected: ${ selected }` : "Nothing is selected" }</Text>
                <PowerActionSheet renderContent={ ChoicesRenderer } ref={ ref => this.actionSheetRef = ref }/>
            </View>
        )
    }

}

export default SimpleChoices;
