import { Button, Message, Separator, Title } from "react-native-power-action-sheet";

import React, { Component, Fragment } from "react";
import { TextInput, View } from "react-native";

class CustomActionSheet extends Component {

    state = {
        text: ""
    };


    render() {
        const { styles, close } = this.props;
        const { text } = this.state;

        return (
            <Fragment>
                <Title { ...this.props } top={ true } title="Enter something"/>
                <Message { ...this.props }
                    message="This is an example how to implement a custom action sheet"
                />
                <Separator { ...this.props }/>
                <View
                    style={ [ styles.control, { padding: 10 } ] }
                >
                    <TextInput style={ { height: 40 } }
                        placeholder="Enter something here!"
                        onChangeText={ ( text ) => this.setState( { text } ) }
                    />
                </View>
                <Separator { ...this.props }/>
                <Button
                    { ...this.props }
                    disabled={ !text }
                    onPress={ () => close( text ) }
                    bottom={ true }
                >
                    Accept
                </Button>
            </Fragment>
        );
    }
}


export default () => (
    {
        maxHeightRatio: 0.9,
        renderContent: ( props ) => ( <CustomActionSheet { ...props }/> )

    }
);
