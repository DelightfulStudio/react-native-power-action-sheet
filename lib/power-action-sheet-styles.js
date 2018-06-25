import { Platform, StyleSheet } from "react-native"

const hairlineWidth = StyleSheet.hairlineWidth;


const base = {

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
    },

    wrapper: {
        flex: 1,
        flexDirection: "row"
    },

    sheet: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "stretch",
        width: "100%"
    },

    content: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "stretch",
    },

    scrollableContent: {
        flex: 0,
        width: "100%"
    },

    control: {
        width: "100%",

        paddingHorizontal: 15,

        opacity: 0.9,
        backgroundColor: "#f9f9f9"
    },

    controlsSeparator: {
        width: "100%",
        height: 2//hairlineWidth
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
        color: "#007aff",
        fontSize: 20
    },

    cancelButton: {
        opacity: 1,
    },

    cancelButtonLabel: {
        fontWeight: "700"
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

    content: {
        paddingHorizontal: 10,
        paddingBottom: 10
    },

    control: {
        backgroundColor: "#f9f9f9"
    },

    cancelButton: {
        marginTop: 10
    }

};

const android = {

    topBorder: {},

    bottomBorder: {},

    sheet: {
        backgroundColor: "#e5e5e5"
    },

    content: {},

    control: {
        backgroundColor: "#fff"
    },

    bottomFiller: {
        height: 0
    },

    cancelButton: {
        marginTop: 6
    }

};

const platform = Platform.select( {
    ios,
    android
} );

const _default = copyStyles( platform, copyStyles( base, {} ) );

const defaultStyles = StyleSheet.create( _default );

function copyStyles( source, target ) {
    Object.keys( source )
        .forEach( key => {
            target[ key ] = Object.assign( {}, target[ key ] || {}, source[ key ] )
        } );
    return target;
}

const createStyles = custom => {
    if ( !custom )
        return defaultStyles;

    return StyleSheet.create( copyStyles( custom, _default ) );
};

export default createStyles;
