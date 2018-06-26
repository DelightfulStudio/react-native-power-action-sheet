import Button from "./button";
import React from "react";

export default ( { styles, onPress } ) => (
    <Button
        onPress={ onPress }
        activeOpacity={ 1 }
        styles={ styles }
        top={ true }
        bottom={ true }
        buttonStyle={ styles.cancelButton }
        labelStyle={ styles.cancelButtonLabel }
    >
        Cancel
    </Button>
)
