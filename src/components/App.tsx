// --- Constants ---
import React from 'react';
import { ApiEndpoints, ClientID, CURRENT_ROUTE, Logs, ModalMessages, SocketClientToServerEvents, SocketGeneralEvents, SocketServerToClientEvents } from '../helpers/constants/constants';
import { User, GoogleAuth, GoogleAuthScopes } from 'react-native-google-auth';

// --- Components ---
import Login from './screens/Login';
import Main from './screens/Main';
import Splash from "./screens/Splash";
import GeneralModal from './Modal';
import { initialWindowMetrics, SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native';


// --- Interfaces ---
import KaotikaPlayer from '../helpers/interfaces/KaotikaPlayer';

// --- Contexts ---
import { ModalContext, UserContext, AllAcolytesContext, AcolyteInitialScreenContext, ScrollContext } from '../helpers/contexts/contexts';


// --- Functions & Hooks ---
import { authenticatePlayer } from '../helpers/serverRequests/authenticatePlayer';
import { useEffect, useState } from "react";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AuthenticatePlayerReturnValue } from '../helpers/interfaces/serverRequestInterfaces/auth.helpers';
import CircleSpinner from './Spinner';

import styled from 'styled-components/native';
import { signOut } from '../helpers/googleSignInUtils/googleSignInUtils';

import { initSocket, performSocketCleanUp, socket } from '../helpers/socket/socket';
import getAllAcolytes from '../helpers/serverRequests/getAllAcolytes';
import { callMessageReceiverListener, getFCMToken, requestUserPermission } from '../helpers/firebaseCloudMessages/pushNotifications';

function App() {

  const [user, setUser] = useState<KaotikaPlayer | null>(null);
  const [allAcolytes, setAllAcolytes] = useState<KaotikaPlayer[] | undefined>(undefined);
  const [initialConf, setInitialConf] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [acolyteInitialScreen, setacolyteInitialScreen] = useState<string | null>(null);
  const [scrollActive, setScrollActive] = useState(true);


  const userHandler = (newUser: KaotikaPlayer | null) => {
    setUser(newUser);
  }

  const getAcolytes = async () => {
    // Get all acolytes: 
    const response = await getAllAcolytes();
    let acolytes = null;

    if (response.status === 200) {
      acolytes = await response.json();
      setAllAcolytes(acolytes);
    } else {
      throw new Error("Error happened while client was trying to get all acolytes from server.");
    }
  }

  useEffect(() => {
    setTimeout(() => {
      authClient(true);
    }, 1000);


    // Initial FCM message permission
    requestUserPermission();

    // Listener for FCM --> listen for FCM messages 
    callMessageReceiverListener();

    // Initial acolytes JSON for app state 
    getAcolytes();

  }, []);

  const updateUserStateWithPushToken = async () => {
    console.log("Injecting Push Notification Token to the user");
    console.log("User is actually:", user);
    const userPushToken = user;
    if (userPushToken) userPushToken.pushToken = await getFCMToken();
    setUser(userPushToken);
  };

  useEffect(() => {

    if (user) {
      const initializeSocketConnection = async () => {


        // Actualizar el estado user de la aplicación para que contenga el tokenID que concede permisos de FCM 
        if (!user?.pushToken) {
          await updateUserStateWithPushToken();

          // Inicializar la conexión con SocketIO.
          console.log("user at socket initialization:");
          console.log(user);
          if (user?.email) {
            initSocket(user);  
          }
        }
      }

      initializeSocketConnection();


    // Inicializado ya el socket ahora hay que controlas los eventos de server a cliente
    // console.log("Now clients watchs SEND_UPDATED_PLAYER_TO_MORTIMER socket event");
    socket.on(SocketServerToClientEvents.SEND_UPDATED_PLAYER_TO_MORTIMER, (updatedAcolyte: KaotikaPlayer) => {
      console.log("Inside SEND_UPDATED_PLAYER_TO_MORTIMER event");
      console.log(updatedAcolyte);
      const newAcolytes: (KaotikaPlayer[] | undefined) = allAcolytes?.map<KaotikaPlayer>((acolyte) => {
        if (acolyte._id === updatedAcolyte._id) return updatedAcolyte;
        return acolyte;
      });

      setAllAcolytes(newAcolytes);
    });

    // console.log("Now clients watchs UPDATE_USER_IN_CLIENT socket event");
    socket.on(SocketServerToClientEvents.UPDATE_USER_IN_CLIENT, (updatedClient: KaotikaPlayer) => {
      console.log("Inside UPDATE_USER_IN_CLIENT event");
      console.log(updatedClient);
      setUser(updatedClient);
    });

  }
  
    return (() => {
    // TODO: HERE (inside return) socketCleanup --> . Disconnect    . removeAllListeners 

  });
}, [user]);


// TODO: Move to /src/helpers/firebaseClientAuth directory
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
      return userAuthResponse.player;
    } else {
      setModalMessage(`The runes of destiny have answered! But they don't rocognite you! ${userAuthResponse.statusCode}`);
      return null;
    }
  } else {
    signOut();
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

      console.log(currentUser);

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
  <SafeAreaProvider initialMetrics={initialWindowMetrics}>
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
              <ScrollContext.Provider value={[scrollActive, setScrollActive]}>
                <AcolyteInitialScreenContext.Provider value={[acolyteInitialScreen, setacolyteInitialScreen]}>
                  <AllAcolytesContext.Provider value={[allAcolytes, setAllAcolytes]}>
                    <UserContext.Provider value={[user, setUser]}>
                      <ModalContext value={setModalMessage}>
                        <Main />
                      </ModalContext>
                    </UserContext.Provider>
                  </AllAcolytesContext.Provider>
                </AcolyteInitialScreenContext.Provider>
              </ScrollContext.Provider>
            )
          ) : (
            <Splash />
          )}
      </StyledView>
    </SafeAreaProvider>
  );

}

export default App;
