import React from "react";
import {ImageBackground, StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";

const LoginScreen = styled.View`
  background-color: papayawhip;
  width: 100%;
  height: 100%;
`

function Splash() {
    return (
        <>
            <LoginScreen>
                <ImageBackground source={require('../../assets/images/SplashScreen.png')} resizeMode="cover" style={{width:'100%', height:'100%'}}>
                </ImageBackground>
            </LoginScreen>
        </>
    );
}
export default Splash;