import createStyles from "./power-action-sheet-styles";
import CancelButton from "./components/cancel-button";

import getWindowHeight from "./window-height";

import React, { Component } from "react";
import { element, func, number, object, oneOfType, string } from "prop-types";
import { Animated, LayoutAnimation, Modal, Platform, ScrollView, Text, View } from "react-native";


const defaultOptions = {
    maxHeightRatio: 0.9,
    sheetView: () => null,
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
                result[ key ] = props[ key ];
            else
                result[ key ] = defaultOptions[ key ];
            return result;
        }, {} )
};


class PowerActionSheet extends Component {

    state = {
        options: null,
        result: null,
        windowHeight: 0,
        maxHeight: 0,
        height: 0,
        overflowing: false,
        visible: false,
        stage: Stage.closed,
        overlayOpacity: new Animated.Value( 0 ),
        styles: {}
    };


    open = async ( options = {} ) => {
        if ( this.state.stage !== Stage.closed )
            return this._replace( options );

        await this._promiseSheet( options );
        Animated.timing(
            this.state.overlayOpacity,
            {
                toValue: 1,
                duration: 250,
                useNativeDriver: true
            }
        ).start();
    };


    close = async result => {
        LayoutAnimation.configureNext( easeInEaseOut );
        await this._promiseState( { stage: Stage.closing } );

        Animated.timing( this.state.overlayOpacity, {
            toValue: 0,
            duration: easeInEaseOut.duration,
            useNativeDriver: true
        } ).start( async () => {
            await this._promiseState( { stage: Stage.closed } );
            await this._promiseState( { visible: false, result } );
            if ( Platform.OS === "android" )
                this._onDismiss();
        } );
    };


    cancel = () => {
        this.close( null );
    };


    _onDismiss = () => {
        const { result, options: { onClose } } = this.state;
        onClose( result );
    };


    _promiseState( state ) {
        return new Promise( ( resolve, reject ) => {
            try {
                this.setState( state, resolve )
            } catch ( x ) {
                reject( x )
            }
        } );
    }

    _replace( options ) {
        const promiseSheetCallback = () => this._promiseSheet( { onClose: this.state.options.onClose, ...options } );
        if ( Platform.OS === "android" ) {
            LayoutAnimation.configureNext( easeInEaseOut );
            setTimeout( promiseSheetCallback, easeInEaseOut.duration * .8 );
        } else {
            LayoutAnimation.configureNext( easeInEaseOut, promiseSheetCallback );
        }
        this.setState( { stage: Stage.closing } );
    }

    async _promiseSheet( options ) {
        options = { ...pickDefaultOptions( this.props ), ...options };

        const windowHeight = getWindowHeight();
        const maxHeight = windowHeight * options.maxHeightRatio;

        return this._promiseState( {
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
    }

    _onLayout = event => {
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
                onDismiss={ this._onDismiss }
            >
                { this._renderContent() }
            </Modal>
        )
    }

    _renderContent() {
        const { stage, styles } = this.state;

        if ( stage === Stage.closed )
            return null;

        return (
            <View style={ styles.wrapper }>
                { this._renderOverlay( styles ) }
                { this._renderSheet( styles ) }
            </View>
        );
    }

    _renderOverlay( styles ) {
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


    _renderSheet( styles ) {
        const { maxHeight, height, overflowing, stage, options } = this.state;

        const calculating = stage === Stage.opening;

        const sheetStyle = [
            styles.sheet
        ];
        const contentStyle = [
            styles.content
        ];

        switch ( stage ) {
            case Stage.opened:
                sheetStyle.push( { bottom: 0, height } );
                contentStyle.push( { flex: 0, height } );
                break;
            case Stage.closing:
                sheetStyle.push( { top: "100%", height } );
                break;
            case Stage.opening:
            case Stage.closed:
                sheetStyle.push( { top: "100%", height: maxHeight * 2 } );
                break;
        }

        const ScrollableContent = ( props ) => {
            const scrollEnabled = !calculating && overflowing;
            return (
                <ScrollView
                    { ...props }
                    scrollEnabled={ scrollEnabled }
                    showsHorizontalScrollIndicator={ scrollEnabled }
                    showsVerticalScrollIndicator={ scrollEnabled }
                    style={ [ styles.scrollableContent, props.style ] }
                />
            );
        };

        const Sheet = options.sheetView;

        return (
            <View style={ sheetStyle }>
                <View style={ contentStyle } onLayout={ this._onLayout }>
                    <Sheet
                        styles={ styles }
                        calculating={ calculating }
                        overflowing={ overflowing }
                        open={ this.open }
                        close={ this.close }
                        ScrollableContent={ ScrollableContent }
                        options={ options }
                    />
                    <CancelButton key="cancel" onPress={ this.cancel } styles={ styles }/>
                </View>
            </View>
        );
    }

}

PowerActionSheet.propTypes = {
    buttonUnderlayColor: string,
    maxHeightRatio: number,
    styles: object,
    sheetView: oneOfType( [ element, func ] )
};

PowerActionSheet.defaultProps = {
    buttonUnderlayColor: "#EBEBEB"
};

export default PowerActionSheet
