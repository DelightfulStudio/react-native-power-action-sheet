import Button from "./components/button";
import styles from "./example-styles";

import React, { Component } from "react";
import { Text, View } from "react-native";

import { ChoicesSheetView, PowerActionSheet } from "@delightfulstudio/react-native-power-action-sheet";

class ExampleWithView extends Component {

    actionSheetRef = React.createRef();
    state = {
        selected: null
    };

    showActionSheet = () => {
        this.actionSheetRef.open( {
            ...this.props.sheetFactory(),
            onClose: selected => { this.setState( { selected } ) }
        } );
    };

    render() {
        const { selected } = this.state;
        return (
            <View style={ styles.container }>
                <Button
                    label={ `${this.props.label} With View` }
                    onPress={ this.showActionSheet }
                    styles={ styles }
                />
                <Text style={ styles.selected }>
                    { selected ? `You selected: ${ selected }` : "Nothing is selected" }
                </Text>
                <PowerActionSheet { ...this.props } sheetView={ ChoicesSheetView } ref={ ref => this.actionSheetRef = ref }/>
            </View>
        )
    }
}

export default ExampleWithView;
