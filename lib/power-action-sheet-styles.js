import { Platform, StyleSheet } from "react-native"

import { currentInsets } from "@delightfulstudio/react-native-safe-area-insets";

const hairlineWidth = StyleSheet.hairlineWidth;


const base = {

    sheet: {
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "stretch",
        width: "100%"
    },

    scrollableContent: {
        flex: 0,
        width: "100%"
    },

    control: {
        width: "100%",

        paddingHorizontal: 15,

        opacity: 1,
        backgroundColor: "#F9F9F9"
    },

    controlSeparator: {
        width: "100%",
        height: hairlineWidth
    },

    button: {
        flex: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

        height: 58
    },

    buttonLabel: {
        color: "#007AFF",
        fontSize: 20
    },

    disabledButtonLabel: {
        color: "grey",
        fontSize: 20
    },

    cancelButton: {
        opacity: 1
    },

    cancelButtonLabel: {
        fontWeight: "700"
    },

    title: {
        paddingVertical: 13,
        textAlign: "center",
        fontSize: 13,
        fontWeight: "700",
        color: "grey"
    },

    message: {
        paddingBottom: 15,
        textAlign: "center",
        fontSize: 13,
        color: "grey"
    }

};

const iosBorderRadius = 12;

const ios = {

    topBorder: {
        borderTopLeftRadius: iosBorderRadius,
        borderTopRightRadius: iosBorderRadius
    },

    bottomBorder: {
        borderBottomLeftRadius: iosBorderRadius,
        borderBottomRightRadius: iosBorderRadius
    },

    borderBumper: {
        height: iosBorderRadius,
    },

    sheet: {
        backgroundColor: "transparent"
    },

    control: {
        backgroundColor: "#F9F9F9"
    },

    cancelButton: {
        marginTop: 10
    }

};

const android = {

    topBorder: {},

    bottomBorder: {},

    sheet: {
        backgroundColor: "#E5E5E5"
    },

    control: {
        backgroundColor: "#FFF"
    },

    bottomFiller: {
        height: 0
    },

    cancelButton: {
        marginTop: 5
    }

};

const platform = Platform.select( {
    ios,
    android
} );

const _default = copyStyles( platform, copyStyles( base, {} ) );

function copyStyles( source, target ) {
    Object.keys( source )
        .forEach( key => {
            target[ key ] = Object.assign( {}, target[ key ] || {}, source[ key ] )
        } );
    return target;
}

export const insetsStyle = async () => {
    const insets = await currentInsets();
    const result = {
        paddingLeft: insets.left,
        paddingRight: insets.right,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
    };
    if ( Platform.OS === "ios" ) {
        result.paddingTop = result.paddingTop || 10;
        result.paddingBottom = result.paddingBottom || 10;
        result.paddingLeft = result.paddingLeft || 10;
        result.paddingRight = result.paddingRight || 10;
    }

    return result;
};

export const createStyles = ( ...customStyles ) => {
    const styles = [ ...customStyles.filter( style => !!style ) ];
    return StyleSheet.create( styles.reduce(
        ( result, style ) => copyStyles( style, result ),
        _default
    ) );
};
