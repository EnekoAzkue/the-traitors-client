// --- Constants ---
import React from 'react';
import { ApiEndpoints, ClientID, Logs, ModalMessages, SocketClientToServerEvents, SocketGeneralEvents } from '../helpers/constants/constants';
import { User, GoogleAuth, GoogleAuthScopes } from 'react-native-google-auth';

// --- Components ---
import Login from './screens/Login';
import Main from './screens/Main';
import Splash from "./screens/Splash";
import GeneralModal from './Modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native';


// --- Interfaces ---
import KaotikaPlayer from '../helpers/interfaces/KaotikaPlayer';

// --- Contexts ---
import { ModalContext, UserContext } from '../helpers/contexts/contexts';

// --- Functions & Hooks ---
import { authenticatePlayer } from '../helpers/userTokenVerification/authenticatePlayer';
import { useEffect, useState } from "react";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, getAuth, signInWithCredential } from '@react-native-firebase/auth';
import { AuthenticatePlayerReturnValue } from '../helpers/interfaces/auth.helpers';
import CircleSpinner from './Spinner';

import styled from 'styled-components/native';
import { signOut } from '../helpers/googleSignInUtils/googleSignInUtils';

import { initSocket, performSocketCleanUp, socket } from '../helpers/socket/socket';

function App() {

  const [user, setUser] = useState<KaotikaPlayer | null>(null);
  const [initialConf, setInitialConf] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const userHandler = (newUser: KaotikaPlayer | null) => {
    setUser(newUser);
  }

  useEffect(() => {
    setTimeout(() => {
      authClient(true);
    }, 1000);
  }, []);

    useEffect(() => {
    if (user) {
      initSocket(user.email);

      return performSocketCleanUp;
    } else {
      // En caso de que se se haga logout ( user === null | user === undefined ) 
    }
  }, [user]);



  const hasPreviousSignIn = async () => {
    const hasPreviousSignIn = GoogleSignin.hasPreviousSignIn();
    return hasPreviousSignIn;
  };

  const getCurrentUser = async () => {
    const hasPreviouslySignedIn = await hasPreviousSignIn();
    if (hasPreviouslySignedIn) {
      const currentUser = GoogleSignin.getCurrentUser();
      const currentUserIdToken = (currentUser?.idToken) ? currentUser.idToken : '';

      const userAuthResponse: AuthenticatePlayerReturnValue = await authenticatePlayer(ApiEndpoints.LOGGED_IN, currentUserIdToken);

      if (userAuthResponse.statusCode === 200 || userAuthResponse.statusCode === 201) {
        setUser(userAuthResponse.player);
      } else {
        return setModalMessage(`The runes of destiny have answered! But they don't rocognite you!`)
      }
    }
  };

  async function authClient(fixed: boolean) {
    if (!fixed) {
      getUser();
    } else {

      try {
        GoogleSignin.configure({
          webClientId: '158827850165-tfs4dej72osh9sfqstdaurec9e6nfcdc.apps.googleusercontent.com',
        });

        await getCurrentUser();

        if (user) {

        } else {

        }

        console.log(Logs.SUCCESSFUL_CONFIGURATION);

        setInitialConf(true);
      } catch (error) {
        signOut();
        console.error(Logs.FAILED_CONFIGURATION, error);
      }
    }
  }



  const getUser = async () => {
    const response = await fetch("https://kaotika-server.fly.dev/players/email/ignacio.ayaso@ikasle.aeg.eus");
    console.log(response);
    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      if (data.status === "OK") {
        console.log("");
        userHandler({ ...data.data, rol: "ACOLYTE" });
      }
    }
    setInitialConf(true);

  };


  async function getIdToken(): Promise<string> {
    let tokens = await GoogleAuth.getTokens();

    const tokenAlmostExpired: number = 300000;
    let tokenExpirationMillisecs = 0;
    console.log(tokens)
    if (tokens.expiresAt) {
      tokenExpirationMillisecs = tokens.expiresAt - Date.now();
    }

    // Si el token ha expirado o va a expirar
    const isTokenExpired: boolean = tokenExpirationMillisecs <= tokenAlmostExpired;

    if (isTokenExpired) {
      console.log("Is token expired? ", isTokenExpired);
      tokens = await GoogleAuth.refreshTokens();
      console.log("Maybe");
    }

    const { idToken } = tokens;

    return idToken;
  }


  const StyledView = styled.View`
    fontFamily: "KochAltschrift";
  `;

  return (
    <SafeAreaView>
      <StyledView>
        <GeneralModal
          message={modalMessage}
          setMessage={setModalMessage}
        />
        {
                
        initialConf ? (
          !user ? (
            <>
              <Login setUser={setUser} setModalMessage={setModalMessage} setIsLoading={setIsLoading} />

              {isLoading ? <CircleSpinner /> : null}
            </>
          ) : (
            <UserContext.Provider value={[user, setUser]}>
              <ModalContext value={setModalMessage}>
                <Main />
              </ModalContext>
            </UserContext.Provider>
          )
        ) : (
          <Splash />
        )}
      </StyledView>
    </SafeAreaView>
  );

}

export default App;
