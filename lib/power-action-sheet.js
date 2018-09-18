import { createStyles, insetsStyle } from "./power-action-sheet-styles";
import Overlay from "./components/overlay";
import CancelButton from "./components/cancel-button";

import getWindowHeight from "./window-height";

import React, { Component } from "react";
import { element, func, number, object, oneOfType, string } from "prop-types";
import { Animated, Dimensions, LayoutAnimation, Modal, Platform, ScrollView, View } from "react-native";


const defaultOptions = {
    maxHeightRatio: .9,
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
        maxHeight: 0,
        height: 0,
        overflowing: false,
        visible: false,
        stage: Stage.closed,
        overlayOpacity: new Animated.Value( 0 ),
        styles: {},
        insets: null
    };

    componentDidMount() {
        Dimensions.addEventListener( "change", this._onDimensionsChange );
    }

    componentWillUnmount() {
        Dimensions.removeEventListener( "change", this._onDimensionsChange );
    }

    open = async ( options = {} ) => {
        if ( this.state.stage !== Stage.closed )
            return this._replace( options );

        await this._promiseSheet( options );
        Animated.timing(
            this.state.overlayOpacity,
            {
                toValue: 1,
                duration: 250,
                useNativeDriver: false
            }
        ).start();
    };


    close = async result => {
        LayoutAnimation.configureNext( easeInEaseOut );
        await this._promiseState( { stage: Stage.closing } );

        Animated.timing( this.state.overlayOpacity, {
            toValue: 0,
            duration: easeInEaseOut.duration,
            useNativeDriver: false
        } ).start( async () => {
            await this._promiseState( { stage: Stage.closed, insets: null } );
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

        return this._promiseState( {
            options,
            overflowing: false,
            visible: true,
            stage: Stage.opening,
            styles: {
                ...createStyles( this.props.styles ),
                buttonUnderlayColor: this.props.buttonUnderlayColor
            }
        } );
    }

    async _calcDimensions() {
        const maxHeight = getWindowHeight() * this.state.options.maxHeightRatio;

        return {
            maxHeight,
            insets: await insetsStyle()
        };
    }


    _onDimensionsChange = () => {
        switch ( this.state.stage ) {
            case Stage.opened:
            case Stage.opening:
                this.setState( {
                    stage: Stage.closed
                }, async () => {
                    const layout = await this._calcDimensions();
                    this.setState( {
                        ...layout,
                        stage: Stage.opening
                    } );
                } );
                break;
        }
    };

    _onShow = async () => {
        const layout = await this._calcDimensions();
        return this.setState( layout );
    };


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
        const { overlayOpacity, visible } = this.state;

        return (
            <Modal
                visible={ visible }
                transparent={ true }
                animationType="none"
                supportedOrientations={ [ "portrait", "landscape" ] }
                onRequestClose={ this.cancel }
                onShow={ this._onShow }
                onDismiss={ this._onDismiss }
            >
                <Overlay opacity={ overlayOpacity } onPress={ this.cancel }/>
                { this._renderSheet() }
            </Modal>
        )
    }


    _renderSheet() {
        const { maxHeight, height, overflowing, stage, styles, insets, options } = this.state;

        if ( !insets || stage === Stage.closed )
            return null;


        const calculating = stage === Stage.opening;
        const scrollEnabled = !calculating && overflowing;


        const sheetStyle = [ insets, styles.sheet ];

        switch ( stage ) {
            case Stage.opened:
                sheetStyle.push( { bottom: 0, maxHeight: height } );
                break;
            case Stage.closing:
                sheetStyle.push( { top: "100%", maxHeight: height } );
                break;
            case Stage.opening:
            case Stage.closed:
                sheetStyle.push( { top: "100%", maxHeight: maxHeight * 2 } );
                break;
        }

        const ScrollableContent = ( props ) => {
            return (
                <ScrollView
                    key="ScrollableContent"
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
            <View style={ sheetStyle } onLayout={ this._onLayout }>
                <Sheet
                    styles={ styles }
                    calculating={ calculating }
                    overflowing={ scrollEnabled }
                    open={ this.open }
                    close={ this.close }
                    ScrollableContent={ ScrollableContent }
                    options={ options }
                />
                <CancelButton key="cancel" onPress={ this.cancel } styles={ styles }/>
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
