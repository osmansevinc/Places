import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet,ImageBackground } from 'react-native';

import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import backgroundImage from '../../assets/background.jpg';

class AuthScreen extends Component {
    loginHandler = () => {
        startMainTabs();
    }

    render () {
        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <View style={styles.container}>
                    <MainText>
                        <HeadingText>Please Log In!</HeadingText>
                    </MainText>
                    <ButtonWithBackground onPress={()=>alert('Hello')}color="#d5ff80">Switch to login</ButtonWithBackground>
                    <View style={styles.inputContainer}>

                        <DefaultInput placeholder="E-Mail Address"style={styles.input}/>
                        <DefaultInput placeholder="Password" style={styles.input}/>
                        <DefaultInput placeholder="Confirm Password" style={styles.input}/>
                    </View>
                    <ButtonWithBackground color="#d5ff80" onPress={this.loginHandler}> Submit</ButtonWithBackground>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
  backgroundImage:{
      width:'100%',
      flex:1,
  },
  container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
  },
  inputContainer:{
      width:'80%'
  },
  input:{
      backgroundColor:'#eee',
      borderColor:'#bbb'
  }
});

export default AuthScreen;