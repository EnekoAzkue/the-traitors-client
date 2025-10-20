import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, getAuth, signInWithCredential } from '@react-native-firebase/auth';
import KaotikaPlayer from '../interfaces/KaotikaPlayer';

export const signOut = async () => {
  try {
    await GoogleSignin.signOut();

  } catch (error) {
    console.error(error);
  }
};