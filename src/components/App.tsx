// --- Constants ---
import React from 'react';
import { ApiEndpoints, Logs, SocketClientToServerEvents, SocketServerToClientEvents } from '../helpers/constants/constants';
import { GoogleAuth } from 'react-native-google-auth';

// --- Components ---
import Login from './screens/Login';
import Main from './screens/Main';
import Splash from "./screens/Splash";
import GeneralModal from './Modal';
import { initialWindowMetrics, SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


// --- Interfaces ---
import KaotikaPlayer from '../helpers/interfaces/KaotikaPlayer';

// --- Contexts ---
import { ModalContext, UserContext, AllAcolytesContext, AcolyteInitialScreenContext, ScrollContext, MortimerToastTextContext, MortimerInitialScreenContext } from '../helpers/contexts/contexts';


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
import Toast from './Toast';
import ScrollModal from './ScrollModal';

function App() {

  const [user, setUser] = useState<KaotikaPlayer | null>(null);
  const [allAcolytes, setAllAcolytes] = useState<KaotikaPlayer[] | undefined>(undefined);
  const [initialConf, setInitialConf] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [scrollModalMessage, setScrollModalMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [acolyteInitialScreen, setacolyteInitialScreen] = useState<string | null>(null);
  const [mortimerInitialScreen, setMortimerInitialScreen] = useState<string>('MortimerHome');
  const [scrollActive, setScrollActive] = useState(true);

  const [mortimerToastText, setMortimerToastText] = useState<string>('');

  useEffect(() => {
    console.log("Mortimer toast text changed:", mortimerToastText);
  }, [mortimerToastText]);

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
    callMessageReceiverListener(setMortimerToastText);

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

      socket.on(SocketServerToClientEvents.FOUND_SCROLL, () => {
        setScrollModalMessage('An acolyte has found the scroll!');
        setScrollActive(false);
        socket.emit(SocketClientToServerEvents.SCROLL_VANISH, {notification : { title: "Pergamino desvanecido", body: "Se os ha convocado al Hall of Sages" }});
      });

    }

    return (() => {
      // TODO: HERE (inside return) socketCleanup --> . Disconnect    . removeAllListeners 
      socket.off(SocketServerToClientEvents.SEND_UPDATED_PLAYER_TO_MORTIMER);
      socket.off(SocketServerToClientEvents.UPDATE_USER_IN_CLIENT);
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
      console.log('THE CURRENT USER IS: ', currentUser);
      const currentUserIdToken = (currentUser?.idToken) ? currentUser.idToken : '';
      console.log('TOKEN OF CURRENT USER IS: ', currentUserIdToken);
      console.log('Tipe of token value: ', typeof currentUserIdToken);

      const userAuthResponse: AuthenticatePlayerReturnValue = await authenticatePlayer(ApiEndpoints.LOGGED_IN, currentUserIdToken);

      console.log('USER AUTH RESPONSE: ');
      console.log(userAuthResponse);

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

      console.log("----------------------------------------------------------------");
      console.log('Authenticating client: ');
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
        setUser(null);
        performSocketCleanUp();

        console.error(Logs.FAILED_CONFIGURATION, error);
      } finally {
        console.log("----------------------------------------------------------------");

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
        {user?.rol === 'mortimer' &&
          <ScrollModal message={scrollModalMessage} setMessage={setScrollModalMessage} />
        }
        {

          initialConf ? (
            !user ? (
              <>
                <Login setUser={setUser} setModalMessage={setModalMessage} setIsLoading={setIsLoading} />

                {isLoading ? <CircleSpinner /> : null}
              </>
            ) : (
              <ScrollContext.Provider value={[scrollActive, setScrollActive]}>
                <MortimerInitialScreenContext.Provider value={[mortimerInitialScreen, setMortimerInitialScreen]}>
                  <AcolyteInitialScreenContext.Provider value={[acolyteInitialScreen, setacolyteInitialScreen]}>
                    <AllAcolytesContext.Provider value={[allAcolytes, setAllAcolytes]}>
                      <UserContext.Provider value={[user, setUser]}>
                        <MortimerToastTextContext.Provider value={[mortimerToastText, setMortimerToastText]}>
                          <ModalContext value={setModalMessage}>
                            <Main />
                            {user?.rol === 'mortimer' &&
                              <Toast toastText={mortimerToastText} setMortimerToastText={setMortimerToastText} />
                            }
                          </ModalContext>
                        </MortimerToastTextContext.Provider>
                      </UserContext.Provider>
                    </AllAcolytesContext.Provider>
                  </AcolyteInitialScreenContext.Provider>
                </MortimerInitialScreenContext.Provider>
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
