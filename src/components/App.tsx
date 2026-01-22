// --- Constants ---
import React from 'react';
import { Screens, SocketServerToClientEvents } from '../helpers/constants/constants';

// --- Components ---
import Login from './screens/Login';
import Splash from "./screens/Splash";
import GeneralModal from './Modal';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';

// --- Interfaces ---
import KaotikaPlayer from '../helpers/interfaces/KaotikaPlayer';

// --- Contexts ---
import { ModalContext, AcolyteInitialScreenContext, ScrollContext, MortimerToastTextContext, MortimerInitialScreenContext, AcolyteToastTextContext, CollectionContext, IstvanInitialScreenContext, VillainInitialScreenContext } from '../helpers/contexts/contexts';

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
import { useUserStore } from '../helpers/stores/useUserStore';
import Navigation from './screens/Navigation';
import CurseBlock from './screens/CurseBlock';
import IllnessBlock from './screens/IllnessBlock';
import TiredBlock from './screens/TiredBlock';
import { useAcolytesStore } from '../helpers/stores/useAcolytesStore';
import { useLoyalsStore } from '../helpers/stores/useLoyalsStore';
import { useBetrayersStore } from '../helpers/stores/useBetrayersStore';
import { useAngeloStore } from '../helpers/stores/useAngeloStore';
import Trial from './screens/Trial';
import { useTrialStore } from '../helpers/stores/useTrialStore';

function App() {

  const { user, setUser } = useUserStore(state => state);
  const [initialConf, setInitialConf] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [scrollModalMessage, setScrollModalMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [acolyteInitialScreen, setacolyteInitialScreen] = useState<string | null>(null);
  const [mortimerInitialScreen, setMortimerInitialScreen] = useState<string>(Screens.MORTIMER_HOME);
  const [istvanInitialScreen, setistvanInitialScreen] = useState<string>(Screens.ISTVAN_HOME);
  const [villainInitialScreen, setvillainInitialScreen] = useState<string>(Screens.VILLAIN_HOME);
  const [scrollActive, setScrollActive] = useState(true);

  const [acolyteToastText, setAcolyteToastText] = useState<string>('');
  const [mortimerToastText, setMortimerToastText] = useState<string>('');

  const { screenDimensions, setScreenDimensions } = useScreenDimensions();
  const screenDimensionsValue = useWindowDimensions();
  const { allAcolytes, setAllAcolytes } = useAcolytesStore()
  const { loyals, setLoyals } = useLoyalsStore()
  const { betrayers, setBetrayers } = useBetrayersStore()
  const {angelo, setAngelo} = useAngeloStore(state => state)
  const {isTrialActive, setTrialActive} = useTrialStore(state => state)



  const userHandler = (newUser: KaotikaPlayer | null) => {
    setUser(newUser);
  }

  useEffect(() => {
    setTimeout(() => {
      authClient(true, { userHandler, setModalMessage, setInitialConf });
    }, 1000);

    setScreenDimensions(screenDimensionsValue);

    // Initial FCM message permission
    requestUserPermission();

    // Listener for FCM --> listen for FCM messages 
    callMessageReceiverListener(setMortimerToastText, setAcolyteToastText);

    // Initial acolytes JSON for app state 
    setAcolytes()
  }, []);

  const setAcolytes = async () => {
    const acolytes = await getAcolytes();
    setAllAcolytes(acolytes[0]);

    setLoyals(acolytes[1])

    setBetrayers(acolytes[2])
  }

  useEffect(() => {

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
        const updatedUser = await updateUserStateWithPushToken(user);
        setUser(updatedUser)
        // Inicializar la conexión con SocketIO.
        if (updatedUser?.email) {
          initSocket(updatedUser);
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

      socket.on(SocketServerToClientEvents.RECIEVED_FOUND_SCROLL, async () => {
        console.log("Inside RECIEVED_FOUND_SCROLL event");
        setScrollModalMessage('An acolyte has found the scroll!');
      });

      socket.on(SocketServerToClientEvents.UPDATE_TRAITORS, (acolyteGroups: KaotikaPlayer[][]) => {
        setBetrayers(acolyteGroups[0])
        setLoyals(acolyteGroups[1])
      })

      socket.on(SocketServerToClientEvents.RESTED, (player: KaotikaPlayer) => {
        const afterRest: KaotikaPlayer[] = allAcolytes.map((item) => {
          if (item.email === player.email) item = player
          return item
        })
        setAllAcolytes(afterRest)
        setLoyals(afterRest)
      })

      socket.on(SocketServerToClientEvents.HEALED, (player: KaotikaPlayer) => {
        console.log('healing acolyte')
        const afterHeal: KaotikaPlayer[] = allAcolytes.map((item) => {
          if (item.email === player.email) item = player
          return item
        })

        if (user.email === player.email) setUser(player); 

        setAllAcolytes(afterHeal)
        setLoyals(afterHeal)
      })

      socket.on(SocketServerToClientEvents.CURSED, (player: KaotikaPlayer) => {
        const afterCurse: KaotikaPlayer[] = allAcolytes.map((item) => {
          if (item.email === player.email) item = player
          return item
        })
        if (user.email === player.email) setUser(player); 

        setAllAcolytes(afterCurse)
        setLoyals(afterCurse)
      })

      socket.on(SocketServerToClientEvents.INFECTED, (player: KaotikaPlayer) => {
        const afterInfect: KaotikaPlayer[] = allAcolytes.map((item) => {
          if (item.email === player.email) item = player
          return item
        })

        if (user.email === player.email) setUser(player); 

        setAllAcolytes(afterInfect)
        setLoyals(afterInfect)
      })

      socket.on(SocketServerToClientEvents.CAPTURED_ANGELO, () => {
      })

      socket.on(SocketServerToClientEvents.RELEASED_ANGELO, () => {
      })

    socket.on(SocketServerToClientEvents.TRIAL_STARTED, () => {
      console.log('starting trial')
      setTrialActive(true)
    })


      setacolyteInitialScreen(user?.homeLocation)
      console.log(user)
      console.log('is user cursed', user.isCursed)

    }

    return (() => {
      // TODO: HERE (inside return) socketCleanup --> . Disconnect    . removeAllListeners 
      socket.off(SocketServerToClientEvents.SEND_UPDATED_PLAYER_TO_MORTIMER);
      socket.off(SocketServerToClientEvents.UPDATE_USER_IN_CLIENT);
      socket.off(SocketServerToClientEvents.RECIEVED_FOUND_SCROLL);
      socket.off(SocketServerToClientEvents.UPDATE_TRAITORS)
      socket.off(SocketServerToClientEvents.RESTED);
      socket.off(SocketServerToClientEvents.HEALED);
      socket.off(SocketServerToClientEvents.CURSED);
      socket.off(SocketServerToClientEvents.INFECTED);
      socket.off(SocketServerToClientEvents.CAPTURED_ANGELO);
      socket.off(SocketServerToClientEvents.RELEASED_ANGELO);

    });

  }, [user]);

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
              <>
                {user?.isCursed && <CurseBlock />}
                {user?.disease.length > 0 && <IllnessBlock />}
                {user?.resistance < 30 && <TiredBlock />}
                {isTrialActive && <Trial />}
                <ScrollContext.Provider value={[scrollActive, setScrollActive]}>
                  <MortimerInitialScreenContext.Provider value={[mortimerInitialScreen, setMortimerInitialScreen]}>
                    <AcolyteInitialScreenContext.Provider value={[acolyteInitialScreen, setacolyteInitialScreen]}>
                      <IstvanInitialScreenContext.Provider value={[istvanInitialScreen, setistvanInitialScreen]}>
                        <VillainInitialScreenContext.Provider value={[villainInitialScreen, setvillainInitialScreen]}>
                          <MortimerToastTextContext.Provider value={[mortimerToastText, setMortimerToastText]}>
                            <AcolyteToastTextContext.Provider value={[acolyteToastText, setAcolyteToastText]}>
                              <MortimerInitialScreenContext.Provider value={[mortimerInitialScreen, setMortimerInitialScreen]}>
                                <ModalContext value={setModalMessage}>
                                  <Navigation />
                                  {user?.rol === 'acolyte' &&
                                    <AcolyteToast toastText={acolyteToastText} setAcolyteToastText={setAcolyteToastText} />
                                  }
                                  {user?.rol === 'mortimer' &&
                                    <Toast toastText={mortimerToastText} setMortimerToastText={setMortimerToastText} />
                                  }

                                </ModalContext>
                              </MortimerInitialScreenContext.Provider>
                            </AcolyteToastTextContext.Provider>
                          </MortimerToastTextContext.Provider>
                        </VillainInitialScreenContext.Provider>
                      </IstvanInitialScreenContext.Provider>
                    </AcolyteInitialScreenContext.Provider>
                  </MortimerInitialScreenContext.Provider>
                </ScrollContext.Provider>
              </>
            )
          ) : (
            <Splash />
          )}
        {user?.rol === 'mortimer' &&
          <ScrollModal message={scrollModalMessage} setMessage={setScrollModalMessage} />
        }
      </StyledView>
    </SafeAreaProvider>
  );

}

export default App;
