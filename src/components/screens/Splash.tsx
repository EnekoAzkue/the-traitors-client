import React from "react";
import {ImageBackground, StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";
import { Images } from "../../helpers/constants/constants";

const LoginScreen = styled.View`
  background-color: papayawhip;
  width: 100%;
  height: 100%;
`

function Splash() {
    return (
        <>
            <LoginScreen>
                <ImageBackground source={Images.SPLASH_SCREEN} resizeMode="cover" style={{width:'100%', height:'100%'}}>
                </ImageBackground>
            </LoginScreen>
        </>
    );
}
export default Splash;