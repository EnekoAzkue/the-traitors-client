import { User, GoogleAuth, GoogleAuthScopes } from 'react-native-google-auth';
import { useEffect, useState } from "react";
import { Text } from "react-native/";
import Login from './screens/Login';
import Main from './screens/Main';
import Splash from "./screens/Splash";
import { authenticatePlayer } from '../helpers/userTokenVerification/authenticatePlayer';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { ApiEndpoints, ClientID, Logs } from '../helpers/constants/constants';
import KaotikaPlayer from '../helpers/interfaces/KaotikaPlayer';

function App() {

  const [user, setUser] = useState<any>(null);
  const [initialConf, setInitialConf] = useState<boolean>(false);

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
        const idToken: string = await getIdToken();

        const authenticationAttempt: { statusCode: number, player: KaotikaPlayer | null } = await authenticatePlayer(ApiEndpoints.LOGGED_IN, idToken);

        if (authenticationAttempt.statusCode === 200) {
          setUser(authenticationAttempt.player);
        } else {
          await GoogleAuth.signOut();
        }
      };

      setInitialConf(true);
    } catch (error) {
      console.error(Logs.FAILED_CONFIGURATION, error);
    }
  }


  async function getIdToken(): Promise<string> {
    let tokens = await GoogleAuth.getTokens();

    // Si el token ha expirado o va a expirar
    const isTokenExpired: boolean = (tokens.expiresAt) ? (tokens.expiresAt - Date.now() <= 300000) : true;

    if (isTokenExpired) {
      tokens = await GoogleAuth.refreshTokens();
    }

    const { idToken } = tokens;

    return idToken;
  }


  useEffect((() => {

  }), []);


  return (
    <SafeAreaView>

      {initialConf ? (
        !user ? (
          <>
            <Login setUser={setUser} setIsLoading={() => { }} /> 
          </>
        ) : (
          <Main />
        )
      ) : (
        <Splash />
      )}
    </SafeAreaView>
  );

}

export default App;
