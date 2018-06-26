import { Button, Message, Separator, Title } from "../components";

import React, { Fragment } from "react";
import { View } from "react-native";

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
    const { styles, open, close } = props;

    const { label, handler, value } = typeof choice === "object"
        ? choice
        : { label: choice, value: choice }
    ;
    return (
        <Fragment key={ index }>
            { index ? <Separator { ...props }/> : null }
            <Button
                { ...props }
                onPress={ () => handler ? handler( { close, open, value } ) : close( value ) }
                styles={ styles }
                top={ top }
                bottom={ bottom }
            >
                { label }
            </Button>
        </Fragment>
    )
};

const Choices = ( props ) => {
    const { ScrollableContent, overflowing, options, top, bottom } = props;
    const { choices } = options;

    const topChoiceHasBorder = top && !overflowing;
    const bottomChoiceHasBorder = bottom && !overflowing;

    return (
        <Fragment>
            <TopBumper { ...props }/>
            { !topChoiceHasBorder ? <Separator { ...props }/> : null }
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
            { !bottomChoiceHasBorder ? <Separator { ...props }/> : null }
            <BottomBumper { ...props }/>
        </Fragment>
    )
};


export default ( props ) => {
    const { options } = props;
    const { title, message, choices } = options;

    const views = [];
    if ( title )
        views.push( ( props ) => <Title { ...props } title={ title }/> );
    if ( message )
        views.push( ( props ) => <Message { ...props } message={ message }/> );
    if ( choices.length )
        views.push( Choices );

    return views.map( ( View, index ) => (
        <View key={ index } { ...props } top={ index === 0 } bottom={ index + 1 === views.length }/>
    ) );
}
