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
import { AuthenticatePlayerReturnValue } from '../helpers/interfaces/auth.helpers';
import CircleSpinner from './Spinner';

import styled from 'styled-components/native';
import { signOut } from '../helpers/googleSignInUtils/googleSignInUtils';

import { initSocket, performSocketCleanUp, socket } from '../helpers/socket/socket';

function App() {

  const [user, setUser] = useState<KaotikaPlayer | null>(null);
  const [initialConf, setInitialConf] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

      console.log(userAuthResponse);
      if (userAuthResponse.statusCode === 200 || userAuthResponse.statusCode === 201) {
        return userAuthResponse.player;
      } else {
        setModalMessage(`The runes of destiny have answered! But they don't rocognite you!`);
        return null;
      }
    } else {
      // signOut();
      return null;
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

        const currentUser = await getCurrentUser();

        // El usuario tiene que tener un correo de AEG
        if (!currentUser) {
          // Cerrar sesión si no lo es y desconectar el usuario
          signOut();
          setUser(null);
          performSocketCleanUp();
        } else {
          // El usuario es un usuario de kaotika y por lo tanto es correcta su autanticación
          // TODO: Refresh token calling getTokenId()
          setUser(currentUser);
          console.log(Logs.SUCCESSFUL_CONFIGURATION);

        }
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
