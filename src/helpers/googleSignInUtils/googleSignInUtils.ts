import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { ApiEndpoints, Logs } from '../constants/constants';
import { performSocketCleanUp } from '../socket/socket';
import { authenticatePlayer } from '../serverRequests/authenticatePlayer';
import { AuthenticatePlayerReturnValue } from '../interfaces/serverRequestInterfaces/auth.helpers';
import GoogleAuth from 'react-native-google-auth';

export const signOut = async () => {
  try {
    await GoogleSignin.signOut();

  } catch (error) {
    console.error(error);
  }
};



// TODO: Move to /src/helpers/firebaseClientAuth directory
export const hasPreviousSignIn = async () => {
  const hasPreviousSignIn = GoogleSignin.hasPreviousSignIn();
  return hasPreviousSignIn;
};

export const getCurrentUser = async (setModalMessage: Function) => {
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

interface applicationsStateSetters {
  userHandler: Function, 
  setModalMessage: Function, 
  setInitialConf: Function
}

export async function authClient(fixed: boolean, appStateSetters: applicationsStateSetters ) {
  if (!fixed) {
    getUser(appStateSetters.userHandler, appStateSetters.setInitialConf);
  } else {

    try {
      GoogleSignin.configure({
        webClientId: '158827850165-tfs4dej72osh9sfqstdaurec9e6nfcdc.apps.googleusercontent.com',
      });

      const currentUser = await getCurrentUser(appStateSetters.setModalMessage);


      // El usuario tiene que tener un correo de AEG
      if (!currentUser) {
        // Cerrar sesión si no lo es y desconectar el usuario
        signOut();
        appStateSetters.userHandler(null);
        performSocketCleanUp();
      } else {
        // El usuario es un usuario de kaotika y por lo tanto es correcta su autanticación
        // TODO: Refresh token calling getTokenId()
        appStateSetters.userHandler(currentUser);
        console.log(Logs.SUCCESSFUL_CONFIGURATION);

      }
      appStateSetters.setInitialConf(true);
    } catch (error) {
      signOut();
      appStateSetters.userHandler(null);
      performSocketCleanUp();

      console.error(Logs.FAILED_CONFIGURATION, error);
    }
  }
}

export async function getIdToken(): Promise<string> {
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

const getUser = async (userHandler: Function, setInitialConf: Function) => {
  const response = await fetch("https://kaotika-server.fly.dev/players/email/ignacio.ayaso@ikasle.aeg.eus");
  if (response.status === 200) {
    const data = await response.json();
    console.log(data);
    if (data.status === "OK") {
      userHandler({ ...data.data, rol: "ACOLYTE" });
    }
  }
  setInitialConf(true);

};


