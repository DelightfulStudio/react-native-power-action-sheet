import React, { Component } from "react";

import Context from "./power-action-sheet-context";
import PowerActionSheet from "./power-action-sheet";


export default class PowerActionSheetProvider extends Component {

    actionSheetRef = React.createRef();

    open = options => {
        this.actionSheetRef.open( options );
    };

    render() {
        return (
            <Context.Provider value={ this.open }>
                { this.props.children }
                <PowerActionSheet { ...this.props } children={ null } ref={ ref => this.actionSheetRef = ref }/>
            </Context.Provider>
        );
    }

}
