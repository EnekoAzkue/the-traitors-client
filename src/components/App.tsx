// --- Constants ---
import React from 'react';
import { SocketServerToClientEvents } from '../helpers/constants/constants';

// --- Components ---
import Login from './screens/Login';
import Main from './screens/Main';
import Splash from "./screens/Splash";
import GeneralModal from './Modal';
import { initialWindowMetrics, SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


// --- Interfaces ---
import KaotikaPlayer from '../helpers/interfaces/KaotikaPlayer';

// --- Functions & Hooks ---
import { useEffect, useState } from "react";
import CircleSpinner from './Spinner';

import styled from 'styled-components/native';
import { authClient } from '../helpers/googleSignInUtils/googleSignInUtils';

import { initSocket, socket } from '../helpers/socket/socket';
import { callMessageReceiverListener, requestUserPermission } from '../helpers/firebaseCloudMessages/pushNotifications';
import Toast from './Toast';
import ScrollModal from './ScrollModal';

import AcolyteToast from './screens/roles/acolyte/AcolyteToast';
import messaging from '@react-native-firebase/messaging';
import { getAcolytes, updateUserStateWithPushToken } from '../helpers/componentUtils/appUtils/appUtils';
import { useScreenDimensions } from '../helpers/stores/useScreenDimensionsStore';
import { useWindowDimensions } from 'react-native';
import { useGeneralModalStore } from '../helpers/stores/useGeneralModalStore';
import { useUserStore } from '../helpers/stores/useUserStore';
import { useMortimerInitialScreenStore } from '../helpers/stores/useMortimerInitialScreenStore';
import { useAllAcolytesStore } from '../helpers/stores/useAllAcolytesStore';
import { useAcolyteInitialScreenStore } from '../helpers/stores/useAcolyteInitialScreenStore';
import { useMortimerToastStore } from '../helpers/stores/useMortimerToastStore';
import { useAcolyteToastStore } from '../helpers/stores/useAcolyteToastStore';

function App() {

  const [mortimerInitialScreen, setMortimerInitialScreen] = useState<string>('MortimerHome');

  const { user, setUser } = useUserStore( state => state);
  const { allAcolytes, setAllAcolytes } = useAllAcolytesStore(state => state);
  const [initialConf, setInitialConf] = useState<boolean>(false);

  const { modalMessage, setModalMessage } = useGeneralModalStore();

  const [scrollModalMessage, setScrollModalMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [scrollActive, setScrollActive] = useState(true);



  const { acolyteToastText, setAcolyteToastText } = useAcolyteToastStore();
  const { mortimerToastText, setMortimerToastText } = useMortimerToastStore()

  const { screenDimensions, setScreenDimensions } = useScreenDimensions();
  const screenDimensionsValue = useWindowDimensions();


  const userHandler = (newUser: KaotikaPlayer | null) => {
    setUser(newUser);
  }

  useEffect(() => {
    setTimeout(() => {
      authClient(true, { userHandler, setModalMessage, setInitialConf });
    }, 1000);

    setScreenDimensions(screenDimensionsValue);
    console.log(`Screen dimesions value is: `);
    console.log(screenDimensionsValue);


    // Initial FCM message permission
    requestUserPermission();

    // Listener for FCM --> listen for FCM messages 
    callMessageReceiverListener(setMortimerToastText, setAcolyteToastText);

    // Initial acolytes JSON for app state 
    getAcolytes({ setAllAcolytes });

    // App en background o cerrada
    const unsubscribeOnNotificationOpened = messaging().onNotificationOpenedApp(remoteMessage => {
      const msg = remoteMessage.data?.scrollMessage;
      if (remoteMessage.notification?.title === "Pergamino encontrado") {
        if (msg) setScrollModalMessage(String(msg));
      } else if (remoteMessage.notification?.title === "An acolyte goes inside tower!" || remoteMessage.notification?.title === "An acolyte goes outside tower!") {
        setMortimerInitialScreen('MortimerTower')
      }
    });

    // App cerrada y abierta desde cero -->  
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        const msg = remoteMessage?.data?.scrollMessage;
        if (remoteMessage?.notification?.title === "Pergamino encontrado") {
          if (msg) setScrollModalMessage(String(msg));
        } else if (remoteMessage?.notification?.title === "An acolyte goes inside tower!" || remoteMessage?.notification?.title === "An acolyte goes outside tower!") {
          setMortimerInitialScreen('MortimerTower')
        }
      });

    return () => {
      unsubscribeOnNotificationOpened();
    };
  }, []);

  useEffect(() => {

    if (user) {
      const initializeSocketConnection = async () => {

        // Actualizar el estado user de la aplicación para que contenga el tokenID que concede permisos de FCM 
        await updateUserStateWithPushToken({ user, setUser });

        // Inicializar la conexión con SocketIO.
        console.log("user at socket initialization:");
        console.log(user);
        if (user?.email) {
          initSocket(user);
        }

      }

      initializeSocketConnection();

      const manageSendUpdatedPlayerToMortimerSocketEvent = null;

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


      const manageUpdateUserInClient = null;

      // console.log("Now clients watchs UPDATE_USER_IN_CLIENT socket event");
      socket.on(SocketServerToClientEvents.UPDATE_USER_IN_CLIENT, (updatedClient: KaotikaPlayer) => {
        console.log("Inside UPDATE_USER_IN_CLIENT event");
        console.log(updatedClient);
        setUser(updatedClient);
      });

      socket.on(SocketServerToClientEvents.RECIEVED_FOUND_SCROLL, async () => {
        console.log("Inside RECIEVED_FOUND_SCROLL event");
        setScrollModalMessage('An acolyte has found the scroll!');
      });

    }

    return (() => {
      // TODO: HERE (inside return) socketCleanup --> . Disconnect    . removeAllListeners 
      socket.off(SocketServerToClientEvents.SEND_UPDATED_PLAYER_TO_MORTIMER);
      socket.off(SocketServerToClientEvents.UPDATE_USER_IN_CLIENT);
      socket.off(SocketServerToClientEvents.RECIEVED_FOUND_SCROLL);
    });
  }, [user]);

  const StyledView = styled.View`
    width: ${screenDimensions?.width}px;
    height: ${screenDimensions?.height}px;
    fontFamily: "KochAltschrift";
  `;

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <StyledView>
        <GeneralModal message={modalMessage} setMessage={setModalMessage} />
        {
          initialConf ? (
            !user ? (
              <>
                <Login setUser={setUser} setModalMessage={setModalMessage} setIsLoading={setIsLoading} />
                {isLoading ? <CircleSpinner /> : null}
              </>
            ) : (
              <>
                <Main />
                {user?.rol === 'acolyte' && <AcolyteToast toastText={acolyteToastText} setAcolyteToastText={setAcolyteToastText} />}
                {user?.rol === 'mortimer' && <Toast toastText={mortimerToastText} setMortimerToastText={setMortimerToastText} />}
              </>
            )
          ) : (
            <Splash />
          )}
        {user?.rol === 'mortimer' && <ScrollModal message={scrollModalMessage} setMessage={setScrollModalMessage} />}
      </StyledView>
    </SafeAreaProvider>
  );

}

export default App;
