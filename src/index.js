import { AppRegistry } from 'react-native';
import App from './components/App';
import { name as appName } from '../app.json';
import messaging from '@react-native-firebase/messaging';


// index.js

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  
  console.log('Message handled in the background!', remoteMessage);
});


function checkMortimerTowerCheck(){

}

AppRegistry.registerComponent(appName, () => App);
