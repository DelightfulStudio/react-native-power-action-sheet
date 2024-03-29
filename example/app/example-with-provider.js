import Button from "./components/button";
import styles from "./example-styles";

import React, { Component } from "react";
import { Text, View } from "react-native";

import { ChoicesSheetView, PowerActionSheetConsumer, PowerActionSheetProvider } from "@delightfulstudio/react-native-power-action-sheet";


class ExampleWithProvider extends Component {

    state = {
        selected: null
    };

    showActionSheet = () => {
        this.props.actionSheet( {
            ...this.props.sheetFactory(),
            onClose: selected => { this.setState( { selected } ) }
        } );
    };

    render() {
        const { selected } = this.state;
        return (
            <View style={ styles.container }>
                <Button
                    label={ `${this.props.label} With Provider` }
                    onPress={ this.showActionSheet }
                    styles={ styles }
                />
                <Text style={ styles.selected }>
                    { selected ? `You selected: ${ selected }` : "Nothing is selected" }
                </Text>
            </View>
        )
    }

}

export default ( props ) => (
    <PowerActionSheetProvider sheetView={ ChoicesSheetView }>
        <PowerActionSheetConsumer>
            { actionSheet => <ExampleWithProvider actionSheet={ actionSheet } { ...props }/> }
        </PowerActionSheetConsumer>
    </PowerActionSheetProvider>
)
