import createStyles from "./power-action-sheet-styles";
import Button from "./components/button";

import React, { Component } from "react";
import { func, number, object, string } from "prop-types";
import { Animated, Dimensions, LayoutAnimation, Modal, ScrollView, Text, View } from "react-native";


const defaultOptions = {
    maxHeightRatio: 0.7,
    renderContent: () => {},
    onClose: () => {}
};


const Stage = {
    closed: 0,
    opening: 1,
    opened: 2,
    closing: 3
};


const { easeInEaseOut } = LayoutAnimation.Presets;


const pickDefaultOptions = props => {
    return Object.keys( defaultOptions )
        .reduce( ( result, key ) => {
            if ( key in props )
                result[key] = props[key];
            else
                result[key] = defaultOptions[key];
            return result;
        }, {} )
};

class PowerActionSheet extends Component {

    state = {
        options: null,
        windowHeight: 0,
        maxHeight: 0,
        height: 0,
        overflowing: false,
        visible: false,
        stage: Stage.closed,
        overlayOpacity: new Animated.Value( 0 ),
        styles: {}
    };


    open( options = {} ) {
        if ( this.state.stage !== Stage.closed )
            return;

        options = { ...pickDefaultOptions( this.props ), ...options };

        const windowHeight = Dimensions.get( "window" ).height;
        const maxHeight = windowHeight * options.maxHeightRatio;

        this.setState( {
            options,
            windowHeight,
            maxHeight,
            overflowing: false,
            visible: true,
            stage: Stage.opening,
            styles: {
                ...createStyles( this.props.styles ),
                buttonUnderlayColor: this.props.buttonUnderlayColor
            }
        } );

        Animated.timing( this.state.overlayOpacity, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true
        } ).start();
    }


    close = result => {
        this.setState( { stage: Stage.closing } );
        LayoutAnimation.configureNext( easeInEaseOut );

        Animated.timing( this.state.overlayOpacity, {
            toValue: 0,
            duration: easeInEaseOut.duration,
            useNativeDriver: true
        } ).start( () => {
            this.setState( { stage: Stage.closed } );
            this.setState( { visible: false } );
            this.state.options.onClose( result );
        } )
    };


    cancel = () => {
        this.close( null );
    };


    onLayout = event => {
        if ( this.state.stage !== Stage.opening )
            return;

        const { height: layoutHeight } = event.nativeEvent.layout;
        const height = Math.min( layoutHeight, this.state.maxHeight );

        this.setState( {
            height,
            overflowing: height < layoutHeight,
            stage: Stage.opened
        } );

        LayoutAnimation.configureNext( easeInEaseOut );
    };


    render() {
        const { visible } = this.state;

        return (
            <Modal
                visible={ visible }
                transparent={ true }
                animationType="none"
                onRequestClose={ this.cancel }
            >
                { this.renderContent() }
            </Modal>
        )
    }

    renderContent() {
        const { stage, styles } = this.state;

        if ( stage === Stage.closed )
            return null;

        return (
            <View style={ styles.wrapper }>
                { this.renderOverlay( styles ) }
                { this.renderSheet( styles ) }
            </View>
        );
    }

    renderOverlay( styles ) {
        const { overlayOpacity } = this.state;

        return (
            <Animated.View
                style={ [
                    styles.overlay,
                    {
                        opacity: overlayOpacity.interpolate( {
                            inputRange: [ 0, 1 ],
                            outputRange: [ 0, 0.4 ]
                        } )
                    }
                ] }
            >
                <Text style={ styles.overlayInner } onPress={ this.cancel }/>
            </Animated.View>
        );
    }


    renderSheet( styles ) {
        const { windowHeight, maxHeight, height, overflowing, stage, options } = this.state;

        const calculating = stage === Stage.opening;

        const sheetStyle = [
            styles.sheet
        ];
        const contentStyle = [
            styles.content
        ];

        switch ( stage ) {
            case Stage.opened:
                sheetStyle.push( { top: windowHeight - height, height } );
                contentStyle.push( { flex: 0, height } );
                break;
            case Stage.closing:
                sheetStyle.push( { top: windowHeight, height } );
                break;
            case Stage.opening:
            case Stage.closed:
                sheetStyle.push( { top: windowHeight, height: maxHeight } );
                break;
        }

        const ScrollableContent = ( props ) => (
            calculating
                ? <View { ...props } style={ [ styles.scrollableContent, props.style ] }/>
                : <ScrollView { ...props } scrollEnabled={ overflowing }
                    style={ [ styles.scrollableContent, props.style ] }/>
        );

        return (
            <View style={ sheetStyle }>
                <View style={ contentStyle } onLayout={ this.onLayout }>
                    { this.state.options.renderContent( {
                        styles,
                        calculating,
                        overflowing,
                        close: this.close,
                        ScrollableContent,
                        options
                    } ) }
                    { this.renderCancelButton( styles ) }
                </View>
            </View>
        );
    }

    renderCancelButton( styles ) {
        return (
            <Button
                key="cancel"
                onPress={ this.cancel }
                activeOpacity={ 1 }
                styles={ styles }
                top={ true }
                bottom={ true }
                buttonStyle={ styles.cancelButton }
                labelStyle={ styles.cancelButtonLabel }
            >
                Cancel
            </Button>
        );
    }

}

PowerActionSheet.propTypes = {
    buttonUnderlayColor: string,
    maxHeightRatio: number,
    styles: object,
    renderContent: func
};

PowerActionSheet.defaultProps = {
    buttonUnderlayColor: "#ebebeb"
};

export default PowerActionSheet
