import React,{Component} from 'react';
import {View, Image, Button,Text, StyleSheet, Dimensions} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import imagePlaceHolder from '../../assets/3.jpg';

class PickLocation extends Component{

    state={
        focusedLocation:{
            latitude: 38.423733,
            longitude: 27.142826,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
    };


    render(){
        return(
            <View style={styles.container}>
                <MapView style={styles.map}
                    initialRegion={this.state.focusedLocation}
                />
                <View style={styles.button}>
                    <Button title="Locate me" onPress={() => alert('deneme')}/>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container:{
        width:'100%',
        alignItems:'center'
    },
    map: {
        width: "100%",
        height: 250
    },
    button: {
        margin: 8
    }
});

export default PickLocation;