import React,{Component} from 'react';
import {View, Image, Button,Text, StyleSheet, Dimensions} from 'react-native';
import MapView, { PROVIDER_GOOGLE ,Marker} from 'react-native-maps';
import imagePlaceHolder from '../../assets/3.jpg';

class PickLocation extends Component{

    state={
        focusedLocation:{
            latitude: 38.423733,
            longitude: 27.142826,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        locationChoosen:false
    };

    pickLocationHandler = event => {
        const coords = event.nativeEvent.coordinate;
        this.map.animateToRegion({
            ...this.state.focusedLocation,
            latitude:coords.latitude,
            longitude:coords.longitude
        });
        this.setState(prevState => {
            return {
              focusedLocation:{
                  ...prevState.focusedLocation,
                  latitude:coords.latitude,
                  longitude:coords.longitude
              },
                locationChoosen:true
            };
        });
        this.props.onLocationPick({
            latitude:coords.latitude,
            longitude:coords.longitude
        });
    }

    getLocationHandler = () => {
        navigator.geolocation.getCurrentPosition(pos => {
            const coordsEvent = {
                nativeEvent:{
                    coordinate:{
                        latitude:pos.coords.latitude,
                        longitude:pos.coords.longitude
                    }
                }
            };
            this.pickLocationHandler(coordsEvent);
        },err => {
            console.log(err);
            alert(err)
        })
    };

    render(){
        let marker = null;

        if(this.state.locationChoosen){
            marker = (
                <Marker coordinate={this.state.focusedLocation}/>
            )
        }

        return(
            <View style={styles.container}>
                <MapView style={styles.map} onPress={this.pickLocationHandler}
                    initialRegion={this.state.focusedLocation}
                         ref={ ref => this.map = ref}
               >
                    {marker}
                </MapView>
                <View style={styles.button}>
                    <Button title="Locate me" onPress={this.getLocationHandler}/>
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