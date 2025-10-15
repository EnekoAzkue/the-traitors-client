import { ImageBackground, StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";
import Button from "../Button";
import React from "react";
import { ApiEndpoints, Images } from "../../helpers/constants/constants";
import { authenticatePlayer } from "../../helpers/userTokenVerification/authenticatePlayer";
import GoogleAuth from "react-native-google-auth";

const LoginScreen = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
`



function Login({ setUser, setIsLoading }: any) {
  console.log("BEFORE ALL")
  const signIn = async () => {
    try {
      // --- Obtener el tokenID del usuario ---
      console.log("After Sign IN")
      const response = await GoogleAuth.signIn();
      console.log("After Sign IN")
      if (response.type === 'success') {
        const idToken = response.data.idToken;

        // --- Con ese tokenId comprobar que no esté caducado ---
        const authResponse = await authenticatePlayer(ApiEndpoints.LOG_IN, idToken);
        console.log('Auth response is: ', authResponse.statusCode);

      } else if (response.type === 'cancelled') {
        console.log('Sign in was cancelled');
        console.error(response);
      }
    } catch (error) {
      console.error('GoogleAuth Sign in failed:', error);
    }
  };

  return (
    <>
      <LoginScreen>
        <ImageBackground source={Images.LOGGING_SCREEN} resizeMode="cover" style={{ width: '100%', height: '100%', alignItems: "center" }}>
          <Button buttonText="Sign In" onPress={signIn} />
        </ImageBackground>
      </LoginScreen>
    </>
  );
}

export default Login;