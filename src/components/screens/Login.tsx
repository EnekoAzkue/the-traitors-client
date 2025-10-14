import { ImageBackground, StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";
import Button from "../Button";
import React from "react";

const LoginScreen = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
`

const signIn = () => {
  console.log('Sign In pressed');
};


function Login({setUser, setIsLoading} : any) {

  return (
    <>
      <LoginScreen>
        <ImageBackground source={require('../../assets/images/LoginScreen.png')} resizeMode="cover" style={{ width: '100%', height: '100%', alignItems: "center" }}>
          <Button buttonText="Sign In" onPress={signIn} />
        </ImageBackground>
      </LoginScreen>
    </>
  );
}

export default Login;