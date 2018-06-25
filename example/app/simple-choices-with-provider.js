import Button from "./components/button";
import simpleChoicesSheetFactory from "./sheets/simple-choices";

import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import { ChoicesRenderer, PowerActionSheetConsumer, PowerActionSheetProvider } from "react-native-power-action-sheet";

const localStyle = StyleSheet.create( {

    selected: {
        paddingVertical: 15,
        textAlign: "center",
        color: "grey"
    }
} );


class SimpleChoicesWithProvider extends Component {

    state = {
        selected: null
    };

    showActionSheet = () => {
        this.props.actionSheet( {
            ...simpleChoicesSheetFactory(),
            onClose: selected => { this.setState( { selected } ) }
        } );
    };

    render() {
        const { selected } = this.state;
        return (
            <View>
                <Button label="Standard Choices With Provider" onPress={ this.showActionSheet }
                    style={ { button: { width: 250 } } }/>
                <Text
                    style={ localStyle.selected }>{ selected ? `You selected: ${ selected }` : "Nothing is selected" }</Text>
            </View>
        )
    }

}

export default () => (
    <PowerActionSheetProvider renderContent={ ChoicesRenderer }>
        <PowerActionSheetConsumer>
            { actionSheet => <SimpleChoicesWithProvider actionSheet={ actionSheet }/> }
        </PowerActionSheetConsumer>
    </PowerActionSheetProvider>
)
