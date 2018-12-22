import React, {Component} from 'react';
import {View,Text,StyleSheet, TouchableOpacity} from 'react-native';
import Iconss from 'react-native-vector-icons/Ionicons';
import { connect } from "react-redux";

import {authLogout} from '../../store/actions/index';

class SideDrawer extends Component{

    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity onPress={this.props.logout}>
                    <View style={styles.drawerItem}>
                        <Iconss name="md-log-out" color="black" style={styles.drawerItemIcon}/>
                        <Text>Sign Out</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        paddingTop:30,
        backgroundColor:'white',
        flex:1
    },
    drawerItem:{
        flexDirection:'row',
        alignItems:'center',
        padding:10,
        backgroundColor:'#eee'
    },
    drawerItemIcon:{
        marginRight:10,
        marginLeft:5
    }
});

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(authLogout()),
    };
};


export default  connect(null,mapDispatchToProps)(SideDrawer);