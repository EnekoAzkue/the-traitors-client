import { User, GoogleAuth, GoogleAuthScopes } from 'react-native-google-auth';
import { useEffect, useState } from "react";
import { Text } from "react-native/";
import Login from './screens/Login';
import Main from './screens/Main';
import Splash from "./screens/Splash";
import { authenticateUser } from '../helpers/userTokenVerification/authenticateUser';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { ApiEndpoints, ClientID, Logs } from '../helpers/constants/constants';

function App() {

  const [user, setUser] = useState<any>(null);
  const [initialConf, setInitialConf] = useState<boolean>(false);

  const authClient = async () => {
    const configure = async () => {
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

          const authenticationAttemptStatusCode: number = await authenticateUser(ApiEndpoints.LOGGED_IN, idToken);

          if (authenticationAttemptStatusCode === 200) {
            setUser(currentUser);
          } else {
            await GoogleAuth.signOut();
          }
        };

        setInitialConf(true);
      } catch (error) {
        console.error(Logs.FAILED_CONFIGURATION, error);
      }
    };
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
              <Login setUser={setUser} setIsLoading={() => {}} /> {/* add isLoading setter */}
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
