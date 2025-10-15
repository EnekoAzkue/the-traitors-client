import { ImageBackground, StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";
import Button from "../Button";
import React from "react";
import { ApiEndpoints, Images } from "../../helpers/constants/constants";
import { authenticatePlayer } from "../../helpers/userTokenVerification/authenticatePlayer";

const LoginScreen = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
`


function Login({setUser, setIsLoading} : any) {

  return (
    <>
      <LoginScreen>
        <ImageBackground source={Images.LOGGING_SCREEN} resizeMode="cover" style={{ width: '100%', height: '100%', alignItems: "center" }}>
          <Button buttonText="Sign In" onPress={authenticatePlayer(ApiEndpoints.LOG_IN, 'tokenId')} />
        </ImageBackground>
      </LoginScreen>
    </>
  );
}

export default Login;