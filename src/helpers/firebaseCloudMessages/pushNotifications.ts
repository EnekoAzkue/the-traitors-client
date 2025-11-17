import messaging from '@react-native-firebase/messaging';

  
  // TODO: Pasar la función a la carpeta /src/helpers/firebase_push_notification
  export const requestUserPermission = async () => {
    console.log('Request User Permission');
    const authStatus = await messaging().requestPermission();
    const enabled = 
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled){
      console.log('Authorization status: ', authStatus);
    }
  };

  // TODO: Pasar la función a la carpeta utils/firebase_push_notification
  export const callMessageReceiverListener = () => {
    console.log("Now app listens ");
    messaging().onMessage(async remoteMessage => {
      console.log('Notification received', remoteMessage);
    });
  };

  // TODO: Pasar la función a la carpeta utils/firebase_push_notification
  export const getFCMToken = async () => {
    const token = await messaging().getToken();
    console.log('Device FCM Token:', token);
    return token;
  };