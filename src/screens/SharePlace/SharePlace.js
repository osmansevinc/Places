import React, { Component } from 'react';
import { View, Text, TextInput, Button,StyleSheet, ScrollView,Image} from 'react-native';
import { connect } from 'react-redux';
import {Navigation} from 'react-native-navigation';

import { addPlace } from '../../store/actions/index';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import MainText from "../../components/UI/MainText/MainText";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import imagePlaceHolder from '../../assets/3.jpg';

class SharePlaceScreen extends Component {

    constructor(props){
        super(props);
        Navigation.events().bindComponent(this);
    };

    placeAddedHandler = placeName => {
        this.props.onAddPlace(placeName);
    }

    render () {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <MainText>
                        <HeadingText>
                            Share a Place with us!
                        </HeadingText>
                    </MainText>
                    <View style={styles.placeholder}>
                        <Image source={imagePlaceHolder} style={styles.previewImage}></Image>
                    </View>
                    <View  style={styles.button}>
                        <Button title="Pick a image" />
                    </View>
                    <View style={styles.placeholder}>
                        <Text>Map</Text>
                    </View>
                    <View style={styles.button}>
                        <Button title="Locate me" />
                    </View>
                    <DefaultInput placeholder="Place Name"/>
                    <View style={styles.button}>
                        <Button title="Share the Place"/>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

/*<PlaceInput onPlaceAdded={this.placeAddedHandler}/>*/

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    placeholder: {
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "#eee",
        width: "80%",
        height: 150
    },
    button: {
        margin: 8
    },
    previewImage: {
        width: "100%",
        height: "100%"
    }
});

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName) => dispatch(addPlace(placeName))
    };
};

export default connect(null,mapDispatchToProps)(SharePlaceScreen);