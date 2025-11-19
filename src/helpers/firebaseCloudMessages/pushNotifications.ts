import messaging from '@react-native-firebase/messaging';

  
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

  export const callMessageReceiverListener = (setMoritmerToastText: Function) => {
    console.log("Now app listens ");
    messaging().onMessage(async remoteMessage => {
      console.log('Notification received', remoteMessage);
      setMoritmerToastText(remoteMessage.data?.body);
    });
  };

  export const getFCMToken = async () => {
    const token = await messaging().getToken();
    console.log('Device FCM Token:', token);
    return token;
  };