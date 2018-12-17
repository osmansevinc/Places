import React, { Component } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import DefaultInput from '../UI/DefaultInput/DefaultInput';

const PlaceInput = props =>(
    <DefaultInput placeholder="Place Name" value={props.placeName} onChangeText={props.onChangeText}/>
);


const styles = StyleSheet.create({

});

export default PlaceInput;
