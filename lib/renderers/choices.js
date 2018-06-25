import Button from "../components/button";

import React, { Fragment } from "react";
import { StyleSheet, Text, View } from "react-native";

const localStyle = StyleSheet.create( {

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


} );


const Title = ( props ) => {
    const { styles, options, top, bottom } = props;
    const { title } = options;

    return title
        ? (
            <View style={ [ styles.control, top && styles.topBorder, bottom && styles.bottomBorder ] }>
                <Text style={ [ localStyle.title ] }>{ title }</Text>
            </View>
        )
        : null
};

const Message = ( props ) => {
    const { styles, options, top, bottom } = props;
    const { message } = options;
    return message
        ? (
            <View style={ [ styles.control, top && styles.topBorder, bottom && styles.bottomBorder ] }>
                <Text style={ [ localStyle.message ] }>{ message }</Text>
            </View>
        )
        : null
};

const TopBumper = ( props ) => {
    const { styles, overflowing, top } = props;
    return top && overflowing
        ? <View style={ [ styles.control, styles.topBorder, styles.borderBumper ] }/>
        : null
};

const BottomBumper = ( props ) => {
    const { styles, overflowing, bottom } = props;
    return bottom && overflowing
        ? <View style={ [ styles.control, styles.bottomBorder, styles.borderBumper ] }/>
        : null
    ;
};

const renderChoice = ( choice, index, props, top, bottom ) => {
    const { styles, close, options } = props;
    const { buttonUnderlayColor } = options;

    const { label, value } = typeof choice === "string"
        ? { label: choice, value: choice }
        : choice
    ;
    return (
        <Fragment key={ index }>
            { index ? <View style={ styles.controlSeparator }/> : null }
            <Button
                onPress={ () => close( value ) }
                underlayColor={ buttonUnderlayColor }
                buttonStyle={ [
                    styles.control,
                    styles.button,
                    top && styles.topBorder,
                    bottom && styles.bottomBorder
                ] }
                labelStyle={ styles.buttonLabel }
            >
                { label }
            </Button>
        </Fragment>
    )
};

const Choices = ( props ) => {
    const { ScrollableContent, overflowing, options, top, bottom, styles } = props;
    const { choices } = options;

    const topChoiceHasBorder = top && !overflowing;
    const bottomChoiceHasBorder = bottom && !overflowing;

    return (
        <Fragment>
            <TopBumper { ...props }/>
            { !topChoiceHasBorder ? <View style={ styles.controlSeparator }/> : null }
            <ScrollableContent>
                { choices.map( ( choice, index ) =>
                    renderChoice(
                        choice,
                        index,
                        props,
                        topChoiceHasBorder && index === 0,
                        bottomChoiceHasBorder && index + 1 === choices.length
                    )
                ) }
            </ScrollableContent>
            { !bottomChoiceHasBorder ? <View style={ styles.controlSeparator }/> : null }
            <BottomBumper { ...props }/>
        </Fragment>
    )
};


export default ( props ) => {
    const { options } = props;
    const { title, message, choices } = options;

    const views = [];
    if ( title )
        views.push( Title );
    if ( message )
        views.push( Message );
    if ( choices.length )
        views.push( Choices );

    return views.map( ( View, index ) => (
        <View key={ index } { ...props } top={ index === 0 } bottom={ index + 1 === views.length }/>
    ) );
}
