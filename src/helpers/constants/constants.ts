


enum ModalMessages {
  ERROR_USER_COULD_NOT_VERIFY = 'You usurper! You have been spelled from this land.',
}

enum ApiEndpoints {
  LOG_IN = 'log-in',
  LOGGED_IN = 'logged-in',
  UPDATE_PLAYER= 'update/',
  GET_ALL_ACOLYTES= 'get-acolytes/',
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
  ACOLYTE_LAB_OPEN = require('../../assets/images/AcolyteLabOpen.png'),
  ACOLYTE_LAB_INSIDE = require('../../assets/images/AcolyteLabInside.png'),
  ACOLYTE_MAP = require('../../assets/images/AcolytesMap.png'),
  SCHOOL_MAP = require('../../assets/images/SchoolMap.png'),
  
  
  ISTVAN_HOME = require('../../assets/images/IstvanHome.png'),
  ISTVAN_SETTINGS = require('../../assets/images/IstvanSettings.png'),
  ISTVAN_LAB = require('../../assets/images/IstvanLab.png'),

  MORTIMER_HOME = require('../../assets/images/MortimerHome.png'),
  MORTIMER_SETTINGS = require('../../assets/images/MortimerSettings.png'),
  MORTIMER_LAB = require('../../assets/images/MortimerLab.png'),
  MORTIMER_TOWER = require('../../assets/images/MortimerTower.png'),

  VILLAIN_HOME = require('../../assets/images/VillainHome.png'),
  VILLAIN_SETTINGS = require('../../assets/images/VillainSettings.png'),
  VILLAIN_LAB = require('../../assets/images/VillainLab.png'),


  MODAL = require('../../assets/images/Modal.png'),

  HOME_ICON = require('../../assets/images/logos/home_icon.png'),
  LAB_ICON = require('../../assets/images/logos/lab_icon.png'),
  SETTINGS_ICON = require('../../assets/images/logos/settings_icon.png'),
  TOWER_ICON = require('../../assets/images/logos/TowerIcon.png'),
  MAP_ICON = require('../../assets/images/logos/MapIcon.png'),
  MAIN_ICON = require('../../assets/images/logos/main.png'),
  HALL_ICON = require('../../assets/images/logos/hall_icon.png'),
  SCROLL = require('../../assets/images/logos/scroll.png'),


  LOGO = require('../../assets/images/logo.png'),
  
  TOWER = require('../../assets/images/Tower.png'),
  TOWER_INSIDE = require('../../assets/images/TowerInside.png'),
  HALL_OF_SAGES = require('../../assets/images/HallOfSages.png'),

  CLOUDS = require('../../assets/images/Clouds.png'),

  BACK_ARROW = require('../../assets/images/BackArrow.png')
}

enum Screens {

  ACOLYTE_HOME = 'AcolyteHome',
  ACOLYTE_SETTINGS = 'AcolyteSettings',
  ACOLYTE_LAB = 'AcolyteLab',
  ACOLYTE_TOWER = 'AcolyteTower',
  ACOLYTE_HALL = 'AcolyteHall',

  ISTVAN_LAB = 'IstvanLab',
  ISTVAN_HOME = 'IstvanHome',
  ISTVAN_SETTINGS = 'IstvanSettings',

  MORTIMER_LAB = 'MortimerLab',
  MORTIMER_HOME = 'MortimerHome',
  MORTIMER_SETTINGS = 'MortimerSettings',
  MORTIMER_TOWER = 'MortimerTower',

  VILLAIN_LAB = 'VillainLab',
  VILLAIN_HOME = 'VillainHome',
  VILLAIN_SETTINGS = 'VillainSettings',

  SCHOOL_MAP = 'SchoolMap',

}

/* --- For local testing, watch: https://docs.google.com/document/d/13t7nvg5CSuUsB5qj1wBU4TsW03_TMxP_6RhYqBUEwcI/edit?tab=t.0 --- */
enum Domains {
  // LOCALHOST = 'http://localhost:3000/',
  LOCALHOST   = 'http://10.70.0.113:3000/',
  RENDER      = 'https://the-traitors-server.onrender.com/',
  PORTAINER   = 'http://10.50.0.50:6001/',
}

enum Routes {
  LOCALHOST   = `${Domains.LOCALHOST}player/`,
  RENDER      = `${Domains.RENDER}player/`,
  PORTAINER   = `${Domains.PORTAINER}player/`,
}


export const CURRENT_DOMAIN = Domains.RENDER;           // Change value for testing in develop (LOCALHOST), render (STAGING) or production (MAIN) 
export const CURRENT_ROUTE  = `${CURRENT_DOMAIN}player/`;


enum Roles {
  ACOLYTE  = 'acolyte',
  VILLAIN  = 'villain',
  MORTIMER = 'mortimer',
  ISTVAN   = 'istvan'
}

enum SocketGeneralEvents {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
}

enum SocketServerToClientEvents {
  ACOLYTE_INSIDE_OUTSIDE_LAB = 'acolyte inside/outside lab',
  SEND_UPDATED_PLAYER_TO_MORTIMER = "send updated player to mortimer",
  UPDATE_USER_IN_CLIENT = "update user in client",
  ACOLYTE_INSIDE_OUTSIDE_TOWER = 'acolyte inside/outside tower'
}

enum SocketClientToServerEvents {
  CONNECTION_OPEN = 'connection open',
  ACCESS_TO_EXIT_FROM_LAB = 'access to/exit from lab',
  CONNECTION_CLOSE = 'connection close',
  UPDATE_USER = 'update user in DB',
  UPDATE_INTOWER = 'update inTower',
}

enum SocketClientToServerEventsForTesting {
  GET_FCM_MESSAGE = "test get fcm message",

}

export const navigationTabMarginBottomForScreens = 800;

export { ModalMessages, ApiEndpoints, ClientID, Logs, Images, Screens, Routes, Roles, Domains, SocketClientToServerEvents, SocketServerToClientEvents, SocketClientToServerEventsForTesting, SocketGeneralEvents};