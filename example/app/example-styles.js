import { StyleSheet } from "react-native";

export default StyleSheet.create( {

    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },

    button: {
        width: 250,
        backgroundColor: "#38f",
    },

    buttonLabel: {
        marginVertical: 15,
        marginHorizontal: 15,
        textAlign: "center",
        color: "#fff",
    },

    selected: {
        paddingVertical: 5,
        textAlign: "center",
        color: "grey"
    },

} );
