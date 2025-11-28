import { ImageBackground } from "react-native";
import styled from "styled-components/native";
import Button from "../Button";
import React, { useEffect } from "react";
import { ApiEndpoints, Images } from "../../helpers/constants/constants";
import { LoginProps } from "../../helpers/interfaces/components/LoginProps";

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, getAuth, signInWithCredential } from '@react-native-firebase/auth';
import { authenticatePlayer } from "../../helpers/serverRequests/authenticatePlayer";
import { signOut } from "../../helpers/googleSignInUtils/googleSignInUtils";

const LoginScreen = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
`

function Login({ setUser, setModalMessage, setIsLoading }: LoginProps) {

  async function onGoogleButtonPress() {

    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    // Get the users ID token
    setIsLoading(true);

    const signInResult = await GoogleSignin.signIn();

    console.log("Sign in result is");
    console.log(signInResult);

    // Try the new style of google-sign in result, from v13+ of that module
    const signInData = signInResult.data;
    let idToken: string | null | undefined = signInData?.idToken;

    if (idToken) {
      // if you are using older versions of google-signin, try old style result
      const userAuthResponse = await authenticatePlayer(ApiEndpoints.LOG_IN, idToken);

      if (!userAuthResponse.player) {
        signOut();
        setModalMessage("You are not worthy to be inside!");
      }else{
        setUser(userAuthResponse.player);
      }
    }
    setIsLoading(false);

    if (!idToken) {
      throw new Error('No ID token found');
    }


    // Create a Google credential with the token
    const googleCredential = await GoogleAuthProvider.credential(signInData?.idToken);

    // Sign-in the user with the credential
    return signInWithCredential(getAuth(), googleCredential);
  }

  useEffect( () =>  {console.log("rendering login");}, []);

  return (
    <>
      <LoginScreen>
        <ImageBackground source={Images.LOGGING_SCREEN} resizeMode="cover" style={{ width: '100%', height: '100%', alignItems: "center" }}>
          <Button buttonText="Sign In" onPress={onGoogleButtonPress} />
        </ImageBackground>
      </LoginScreen>
    </>
  );
}

export default Login;