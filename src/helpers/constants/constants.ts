
enum ModalMessages {
  ERROR_USER_COULD_NOT_VERIFY = 'You usurper! You have been spelled from this land.',
}

enum ApiEndpoints {
  LOG_IN            = 'log-in',
  LOGGED_IN         = 'logged-in',
  UPDATE_PLAYER     = 'update/',
  GET_ALL_ACOLYTES  = 'get-acolytes/',
  GET_LOYALS        = 'get-loyals/',
  GET_BETRAYERS     = 'get-betrayers',
}

enum ClientID {
  WEB = '158827850165-tfs4dej72osh9sfqstdaurec9e6nfcdc.apps.googleusercontent.com'
}

enum Logs {
  FAILED_CONFIGURATION      = 'Configuration failed:',
  SUCCESSFUL_CONFIGURATION  = 'Google Auth configured successfully',
}

enum Images {

  // --- GENERAL SCREEN IMAGES --- //
  LOGGING_SCREEN          = require('../../assets/images/LoginScreen.png'),
  SPLASH_SCREEN           = require('../../assets/images/SplashScreen.png'),
  HALL_OF_SAGES           = require('../../assets/images/HallOfSages.png'),
  OBITUARY                = require('../../assets/images/Obituary.png'),

  // --- ACOLYTE IMAGES --- //
  ACOLYTE_HOME            = require('../../assets/images/AcolyteHome.png'),
  ACOLYTE_SETTINGS        = require('../../assets/images/AcolyteSettings.png'),
  ACOLYTE_LAB             = require('../../assets/images/AcolyteLab.png'),
  ACOLYTE_LAB_OPEN        = require('../../assets/images/AcolyteLabOpen.png'),
  ACOLYTE_LAB_INSIDE      = require('../../assets/images/AcolyteLabInside.png'),
  ACOLYTE_MAP             = require('../../assets/images/AcolytesMap.png'),
  SCHOOL_MAP              = require('../../assets/images/SchoolMap.png'),
  TOWER                   = require('../../assets/images/Tower.png'),
  TOWER_INSIDE            = require('../../assets/images/TowerInside.png'),
  ACOLYTE_INN_BASE        = require('../../assets/images/AcolyteInnBase.png'),
  ACOLYTE_INN_LOYAL       = require('../../assets/images/AcolyteInnLoyals.png'),
  ACOLYTE_INN_TRAITORS    = require('../../assets/images/AcolyteInnTraitors.png'),
  ACOLYTE_HOLLOW          = require('../../assets/images/AcolyteHollow.png'),

  // --- ISTVAN IMAGES --- //
  ISTVAN_HOME             = require('../../assets/images/IstvanHome.png'),
  ISTVAN_SETTINGS         = require('../../assets/images/IstvanSettings.png'),
  ISTVAN_LAB              = require('../../assets/images/IstvanLab.png'),

  // --- MORTIMER IMAGES --- //
  MORTIMER_HOME           = require('../../assets/images/MortimerHome.png'),
  MORTIMER_SETTINGS       = require('../../assets/images/MortimerSettings.png'),
  MORTIMER_LAB            = require('../../assets/images/MortimerLab.png'),
  MORTIMER_TOWER          = require('../../assets/images/MortimerTower.png'),

  // --- VILLAIN IMAGES --- //
  VILLAIN_HOME            = require('../../assets/images/VillainHome.png'),
  VILLAIN_SETTINGS        = require('../../assets/images/VillainSettings.png'),
  VILLAIN_LAB             = require('../../assets/images/VillainLab.png'),

  // --- LOCATION ICONS --- //
  HOME_ICON               = require('../../assets/images/logos/home_icon.png'),
  LAB_ICON                = require('../../assets/images/logos/lab_icon.png'),
  SETTINGS_ICON           = require('../../assets/images/logos/settings_icon.png'),
  TOWER_ICON              = require('../../assets/images/logos/TowerIcon.png'),
  MAP_ICON                = require('../../assets/images/logos/MapIcon.png'),
  MAIN_ICON               = require('../../assets/images/logos/main.png'),
  HALL_ICON               = require('../../assets/images/logos/hall_icon.png'),
  SCROLL                  = require('../../assets/images/logos/scroll.png'),
  SWAMP_ICON              = require('../../assets/images/logos/swamp_icon.png'),
  OBITUARY_ICON           = require('../../assets/images/logos/obituary_icon.png'),
  INN_ICON                = require('../../assets/images/logos/inn_icon.png'),
  DUNGEON_ICON            = require('../../assets/images/logos/dungeon_icon.png'),
  HOLLOW_ICON             = require('../../assets/images/logos/hollow_icon.png'),

  // --- GENERAL IMAGES --- //
  LOGO                    = require('../../assets/images/logo.png'),
  CLOUDS                  = require('../../assets/images/Clouds.png'),
  BACK_ARROW              = require('../../assets/images/BackArrow.png'),
  BAG                     = require('../../assets/images/logos/bag.png'),
  BUTTON                  = require('../../assets/images/Button_1.png'),
  MODAL                   = require('../../assets/images/Modal.png'),
  BETRAYER_MODAL          = require('../../assets/images/BetrayerModal.png'),
  AVATAR_CONTAINER        = require('../../assets/images/AvatarContainer.png'),
  ROSETTE                 = require('../../assets/images/Roseta.png'),
  SCHOOL_DUNGEON          = require('../../assets/images/Dungeon.png'),

  // --- ARTIFACT ICONS --- //
  DRAGON_HEART_ICON       = require('../../assets/artifactImages/Dragon_heart_icon.png'),
  HUBRIS_ICON             = require('../../assets/artifactImages/Hubris_icon.png'),
  JAKSHO_ICON             = require('../../assets/artifactImages/Jak_sho_icon.png'),
  PHANTOM_DANCER_ICON     = require('../../assets/artifactImages/Phantom_dancer_icon.png'),
  PROWLERS_CLAW_ICON      = require('../../assets/artifactImages/Prowlers_claw_icon.png'),
  HEMOMANCERS_HELM_ICON   = require('../../assets/artifactImages/Hemomancers_helm_icon.png'),
  DEMON_KINGS_CROWN_ICON  = require('../../assets/artifactImages/Demon_kings_crown_icon.png'),

}

enum Screens {

  // --- ACOLYTE --- //
  ACOLYTE_HOME      = 'AcolyteHome',
  ACOLYTE_SETTINGS  = 'AcolyteSettings',
  ACOLYTE_LAB       = 'AcolyteLab',
  ACOLYTE_TOWER     = 'AcolyteTower',
  ACOLYTE_HALL      = 'AcolyteHall',
  SCHOOL_MAP        = 'SchoolMap',
  OBITUARY          = 'Obituary',
  ACOLYTE_INN       = 'Inn',
  ACOLYTE_HOLLOW    = 'Hollow',


  // --- ISTVAN --- //
  ISTVAN_LAB        = 'IstvanLab',
  ISTVAN_HOME       = 'IstvanHome',
  ISTVAN_SWAMP      = 'IstvanSwamp',
  ISTVAN_SETTINGS   = 'IstvanSettings',

  // --- MORTIMER --- //
  MORTIMER_LAB      = 'MortimerLab',
  MORTIMER_HOME     = 'MortimerHome',
  MORTIMER_SWAMP    = 'MortimerSwamp',
  MORTIMER_SETTINGS = 'MortimerSettings',
  MORTIMER_TOWER    = 'MortimerTower',

  // --- VILLAIN --- //
  VILLAIN_LAB       = 'VillainLab',
  VILLAIN_HOME      = 'VillainHome',
  VILLAIN_SWAMP     = 'VillainSwamp',
  VILLAIN_SETTINGS  = 'VillainSettings',

  // --- GENERAL --- //
  SWAMP             = 'Swamp',
  HALL_OF_SAGES     = 'HallOfSages',
  DUNGEON           = 'Dungeon'

}

/* --- For local testing, watch: https://docs.google.com/document/d/13t7nvg5CSuUsB5qj1wBU4TsW03_TMxP_6RhYqBUEwcI/edit?tab=t.0 --- */
enum Domains {

  // LOCALHOST = 'http://localhost:3000/',
  LOCALHOST = 'http://10.70.0.41:3000/',
  RENDER    = 'https://the-traitors-server.onrender.com/',
  PORTAINER = 'http://10.50.0.50:6001/',

}

enum Routes {

  LOCALHOST = `${Domains.LOCALHOST}player/`,
  RENDER    = `${Domains.RENDER}player/`,
  PORTAINER = `${Domains.PORTAINER}player/`,

}

export const CURRENT_DOMAIN   = Domains.RENDER;           // Change value for testing in develop (LOCALHOST), render (STAGING) or production (MAIN)
export const CURRENT_ROUTE    = `${CURRENT_DOMAIN}player/`;

enum Roles {

  ACOLYTE   = 'acolyte',
  VILLAIN   = 'villain',
  MORTIMER  = 'mortimer',
  ISTVAN    = 'istvan',

}

const swampArtifactIcons = [

  Images.HUBRIS_ICON,
  Images.DRAGON_HEART_ICON,
  Images.JAKSHO_ICON,
  Images.PHANTOM_DANCER_ICON,
  Images.PROWLERS_CLAW_ICON,
  Images.HEMOMANCERS_HELM_ICON,
  Images.DEMON_KINGS_CROWN_ICON,

];

enum SocketGeneralEvents {

  CONNECT = 'connect',
  DISCONNECT = 'disconnect',

}

enum SocketServerToClientEvents {

  // ACOLYTE_INSIDE_OUTSIDE_LAB      = 'acolyte inside/outside lab',
  SEND_UPDATED_PLAYER_TO_MORTIMER = 'send updated player to mortimer',
  UPDATE_USER_IN_CLIENT           = 'update user in client',
  // ACOLYTE_INSIDE_OUTSIDE_TOWER    = 'acolyte inside/outside tower',
  RECIEVED_FOUND_SCROLL           = 'recieved found scroll',
  // SCROLL_VANISH                   = 'scroll vanish',
  SENDING_ARTIFACTS               = 'sending artifacts',
  GET_IN_SWAMP_ACOLYTES           = 'sending acolytes in swamp',
  GET_ACOLYTE_NEW_COORDS          = 'sending acolytes in swamp coords',
  COLLECTED                       = 'collected',
  SENDING_ACOLYTES_IN_HALL        = 'sending acolytes in hall',
  ACOLYTE_ENTERED_EXITED_HALL     = 'acolyte entered/exited the hall',
  END_VALIDATION                  = 'end validation',
  SENDING_MORTIMER_IN_HALL        = 'sending mortimer in hall',
  MORTIMER_ENTERED_EXITED_HALL    = 'mortimer entered/exited hall',
  SHOWING_ARTIFACS                = 'showing artifacts',

}

enum SocketClientToServerEvents {

  CONNECTION_OPEN               = 'connection open',
  CONNECTION_CLOSE              = 'connection close',
  ACCESS_TO_EXIT_FROM_LAB       = 'access to/exit from lab',
  UPDATE_USER                   = 'update user in DB',
  UPDATE_INTOWER                = 'update inTower',
  SEND_NOTIFICATION_TO_MORTIMER = "send notification to mortimer",
  SCROLL_VANISH                 = 'scroll vanish',
  SEND_FOUND_SCROLL             = 'send found scroll',
  REQUEST_ARTIFACTS             = 'request artifacts',
  REQUEST_SWAMP_ACOLYTES        = 'request swamp acolytes',
  COLLECT                       = 'collect',
  SEND_ACOLYTES_COORDS          = 'send acolytes coords',
  ENTER_EXIT_HALL               = 'enter/exit hall',
  SHOW_ARTIFACTS                = 'show artifacts',
  SEARCH_FOR_ACOLYTES_IN_HALL   = 'search for acolytes in hall',
  DISCARD_ARTIFACTS             = 'discard artifacts',
  ACCEPT_ARTIFACTS              = 'accept artifacts',
  MORTIMER_IN_HALL              = 'mortimer in hall',
  SEARCH_FOR_MORTIMER_IN_HALL   = 'search for mortimer in hall',

}

enum SocketClientToServerEventsForTesting {

  GET_FCM_MESSAGE = "test get fcm message",

}


enum INN_STATES {
  SHOW_BETRAYER_MODAL= 0,
  INSIDE_INN = 1,
};

export {
  
  ModalMessages,
  ApiEndpoints,
  ClientID,
  Logs,
  Images,
  Screens,
  Routes,
  Roles,
  swampArtifactIcons,
  Domains,
  SocketClientToServerEvents,
  SocketServerToClientEvents,
  SocketClientToServerEventsForTesting,
  SocketGeneralEvents,
  INN_STATES,
  
};
