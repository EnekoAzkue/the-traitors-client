import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, getAuth, signInWithCredential } from '@react-native-firebase/auth';
import KaotikaPlayer from '../interfaces/KaotikaPlayer';

export const signOut = async (userSetter: (nullUser: null) => void) => {
  try {
    await GoogleSignin.signOut();
    userSetter( null ); // Remember to remove the user from your app's state as well

  } catch (error) {
    console.error(error);
  }
};