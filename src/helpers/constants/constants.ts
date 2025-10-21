


enum ModalMessages {
  ERROR_USER_COULD_NOT_VERIFY = 'You usurper! You have been spelled from this land.',
}

enum ApiEndpoints {
  LOG_IN = 'log-in',
  LOGGED_IN = 'logged-in',
  UPDATE_PLAYER= 'update/',
}

enum ClientID {
  WEB = '158827850165-tfs4dej72osh9sfqstdaurec9e6nfcdc.apps.googleusercontent.com'
}

enum Logs {
  FAILED_CONFIGURATION = 'Configuration failed:',
  SUCCESSFUL_CONFIGURATION = 'Google Auth configured successfully',
}

enum Images {
  LOGGING_SCREEN = require('../../assets/images/LoginScreen.png'),
  BUTTON = require('../../assets/images/Button_1.png'),
  SPLASH_SCREEN = require('../../assets/images/SplashScreen.png'),
  ACOLYTE_HOME = require('../../assets/images/AcolyteHome.png'), 
  ACOLYTE_SETTINGS = require('../../assets/images/AcolyteSettings.png'),
  ACOLYTE_LAB = require('../../assets/images/AcolyteLab.png'),
  MODAL = require('../../assets/images/Modal.png'),

  HOME_ICON = require('../../assets/images/logos/home_icon.png'),
  LAB_ICON = require('../../assets/images/logos/lab_icon.png'),
  SETTINGS_ICON = require('../../assets/images/logos/settings_icon.png'),

  LOGO = require('../../assets/images/logo.png'),
  

}

enum Screens {
  HOME = 'Home',
  SETTINGS = 'Settings',
  LAB = 'Lab',
}

enum Routes {
  LOCALHOST = 'http://localhost:3000/player/',
  RENDER = 'https://the-traitors-server.onrender.com/player/',
  PORTAINER = 'http://10.50.0.50:6001/player/',
}



enum Roles {
  ACOLYTE  = 'acolyte',
  VILLAIN  = 'villain',
  MORTIMER = 'mortimer',
  ISTVAN   = 'istvan'
}

export { ModalMessages, ApiEndpoints, ClientID, Logs, Images, Screens, Routes, Roles};