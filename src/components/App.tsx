import { User, GoogleAuth, GoogleAuthScopes } from 'react-native-google-auth';
import { useEffect, useState } from "react";
import { Text } from "react-native/";
import Login from './screens/Login';
import Main from './screens/Main';
import Splash from "./screens/Splash";
import { authenticatePlayer } from '../helpers/userTokenVerification/authenticatePlayer';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { ApiEndpoints, ClientID, Logs, ModalMessages } from '../helpers/constants/constants';
import KaotikaPlayer from '../helpers/interfaces/KaotikaPlayer';
import GeneralModal from './Modal';
import { ModalContext } from '../helpers/interfaces/MoldalContext';

function App() {

  const [user, setUser] = useState<any>(null);
  const [initialConf, setInitialConf] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('')

  useEffect(() => {
    setTimeout(() => {
      authClient();
    }, 1000);
  }, []);

  async function authClient() {
    try {
      await GoogleAuth.configure({

        webClientId: ClientID.WEB,
        scopes: [
          GoogleAuthScopes.EMAIL,
        ]
      });
      console.log(Logs.SUCCESSFUL_CONFIGURATION);


      const currentUser: User | null = await GoogleAuth.getCurrentUser();

      if (currentUser) {
        console.log("user logged in: ", currentUser.name)
        const idToken: string = await getIdToken();
        console.log(idToken)
        const authenticationAttempt: { statusCode: number, player: KaotikaPlayer | null } = await authenticatePlayer(ApiEndpoints.LOGGED_IN, idToken);

        if (authenticationAttempt.statusCode === 200) {
          setUser(authenticationAttempt.player);
        } else {
          await GoogleAuth.signOut();
          setModalMessage(
            ModalMessages.ERROR_USER_COULD_NOT_VERIFY);
        }
      };

      setInitialConf(true);
    } catch (error) {
      console.error(Logs.FAILED_CONFIGURATION, error);
    }
  }


  async function getIdToken(): Promise<string> {
    let tokens = await GoogleAuth.getTokens();
    
    const tokenAlmostExpired : number = 300000;
    let tokenExpirationMillisecs = 0;
    console.log(tokens)
    if(tokens.expiresAt){
      tokenExpirationMillisecs = tokens.expiresAt - Date.now();
    }

    // Si el token ha expirado o va a expirar
    const isTokenExpired : boolean = tokenExpirationMillisecs <= tokenAlmostExpired;

    // if (isTokenExpired) {
    //   console.log("Is token expired? ", isTokenExpired);
    //   tokens = await GoogleAuth.refreshTokens();
    //   console.log("Maybe")
    // }

    const { idToken } = tokens;

    return idToken;
  }


  return (
    <SafeAreaView>
      <GeneralModal
        message={modalMessage}
        setMessage={setModalMessage}
      />
      {initialConf ? (
        !user ? (
          <>
            <Login setUser={setUser} setModalMessage={setModalMessage} />
          </>
        ) : (
          <ModalContext value={setModalMessage}>
            <Main />
          </ModalContext>
        )
      ) : (
        <Splash />
      )}
    </SafeAreaView>
  );

}

export default App;
