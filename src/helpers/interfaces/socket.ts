import Artifact from './Artifact';
import KaotikaPlayer from './KaotikaPlayer';
import { GeolacationCoords, UserCoords } from './Geolocation';
import { SocketClientToServerEvents, SocketClientToServerEventsForTesting, SocketServerToClientEvents } from '../constants/constants';

// --- SERVER TO CLIENT SOCKECT EVENT DECLARATION --- //
interface ServerToClientEvents {

  [SocketServerToClientEvents.RECIEVED_FOUND_SCROLL]            : () => void;
  [SocketServerToClientEvents.COLLECTED]                        : () => void;
  [SocketServerToClientEvents.SEND_UPDATED_PLAYER_TO_MORTIMER]  : ( acolyteData: any ) => void;
  [SocketServerToClientEvents.UPDATE_USER_IN_CLIENT]            : ( acolyteData: any ) => void;
  [SocketServerToClientEvents.SENDING_ARTIFACTS]                : ( artifacts: Artifact[] ) => void;
  [SocketServerToClientEvents.GET_IN_SWAMP_ACOLYTES]            : ( inSwampAcolytes: KaotikaPlayer[] ) => void;
  [SocketServerToClientEvents.GET_ACOLYTE_NEW_COORDS]           : ( newCoords: {email: string, coords: GeolacationCoords} ) => void;
  [SocketServerToClientEvents.SENDING_ACOLYTES_IN_HALL]         : (acolytesInHall: KaotikaPlayer[]) => void;
  [SocketServerToClientEvents.ACOLYTE_ENTERED_EXITED_HALL]      : () => void;
  [SocketServerToClientEvents.END_VALIDATION]                   : (request: {accepted: boolean}) => void;
  [SocketServerToClientEvents.SENDING_MORTIMER_IN_HALL]         : (inHall: boolean) => void;
  [SocketServerToClientEvents.MORTIMER_ENTERED_EXITED_HALL]     : (inHall: boolean) => void;
  [SocketServerToClientEvents.SHOWING_ARTIFACS]                 : () => void;
  [SocketServerToClientEvents.UPDATE_TRAITORS]                  : (acolyteGroups: KaotikaPlayer [][]) => void
  [SocketServerToClientEvents.RESTED]                           : ( restedPlayer: KaotikaPlayer) => void;
  [SocketServerToClientEvents.HEALED]                           : ( healededPlayer: KaotikaPlayer) => void;
  [SocketServerToClientEvents.CURSED]                           : ( cursedPlayer: KaotikaPlayer) => void;
  [SocketServerToClientEvents.INFECTED]                         : ( infectedPlayer: KaotikaPlayer) => void;
  [SocketServerToClientEvents.CAPTURED_ANGELO]                 : () => void;
  [SocketServerToClientEvents.DELIVERED_ANGELO]                 : () => void;
  [SocketServerToClientEvents.RELEASED_ANGELO]                 : () => void;
  [SocketServerToClientEvents.VOTATION]                         : (vote: boolean) => void;
  [SocketServerToClientEvents.TRIAL_STARTED]                    : () => void;


};
  
// --- CLIENT TO SERVER SOCKECT EVENT DECLARATION --- //
interface ClientToServerEvents {

  [SocketClientToServerEvents.REQUEST_SWAMP_ACOLYTES]           : () => void;
  [SocketClientToServerEvents.SEND_FOUND_SCROLL]                : () => void;
  [SocketClientToServerEvents.SEND_NOTIFICATION_TO_MORTIMER]    : ( messsage: {} ) => void;
  [SocketClientToServerEvents.SCROLL_VANISH]                    : ( messsage: {} ) => void;
  [SocketClientToServerEvents.REQUEST_ARTIFACTS]                : ( userRol: string ) => void;
  [SocketClientToServerEvents.CONNECTION_OPEN]                  : ( userEmail: string ) => void;
  [SocketClientToServerEvents.CONNECTION_CLOSE]                 : ( userEmail: string ) => void;
  [SocketClientToServerEvents.ACCESS_TO_EXIT_FROM_LAB]          : ( acolyteEmail: string ) => void;
  [SocketClientToServerEvents.COLLECT]                          : ( artifactName: string ) => void;
  [SocketClientToServerEvents.SEND_ACOLYTES_COORDS]             : ( userCoords: UserCoords ) => void;
  [SocketClientToServerEvents.UPDATE_USER]                      : ( acolyteEmail: string, changes: any ) => void;
  [SocketClientToServerEvents.UPDATE_INTOWER]                   : ( userEmail: string, inTower: boolean ) => void;
  [SocketClientToServerEvents.ENTER_EXIT_HALL]                  : ( acolyteMail: string, inHall: any ) => void;




  // --- FOR TEST PURPOUSE --- //
  [SocketClientToServerEventsForTesting.GET_FCM_MESSAGE]        : ( getSuccesfully: boolean ) => void;

}

  
interface AcolyteDataAfterAccessExitLab {

  email     : string;
  isInside  : boolean;
  nickname  : string;
  avatar    : string;
}

interface AcolyteDataAfterAccessExitTower {

  email     : string;
  inTower   : boolean;
  nickname  : string;
  avatar    : string;

}


// Declaration of the events used when sending events to the server
interface ClientToServerEvents {
  [SocketClientToServerEvents.CONNECTION_OPEN]                : (userEmail: string) => void;
  [SocketClientToServerEvents.CONNECTION_CLOSE]               : (userEmail: string) => void;
  [SocketClientToServerEvents.ACCESS_TO_EXIT_FROM_LAB]        : (acolyteEmail: string) => void;
  [SocketClientToServerEvents.UPDATE_USER]                    : (acolyteEmail: string, changes: any) => void;
  [SocketClientToServerEvents.UPDATE_INTOWER]                 : (userEmail: string, inTower: boolean) => void;
  [SocketClientToServerEvents.SEND_NOTIFICATION_TO_MORTIMER]  : (messsage: {}) => void;
  [SocketClientToServerEvents.SCROLL_VANISH]                  : (messsage: {}) => void;
  [SocketClientToServerEvents.SEND_FOUND_SCROLL]              : () => void;
  [SocketClientToServerEvents.REQUEST_ARTIFACTS]              : (userRol: string) => void;
  [SocketClientToServerEvents.REQUEST_SWAMP_ACOLYTES]         : () => void;
  [SocketClientToServerEvents.COLLECT]                        : (artifactName: string) => void;
  [SocketClientToServerEvents.ENTER_EXIT_HALL]                : (acolyteMail: string, inHall: any) => void;
  [SocketClientToServerEvents.SHOW_ARTIFACTS]                 : () => void;
  [SocketClientToServerEvents.SEARCH_FOR_ACOLYTES_IN_HALL]    : () => void;
  [SocketClientToServerEvents.DISCARD_ARTIFACTS]              : () => void;
  [SocketClientToServerEvents.ACCEPT_ARTIFACTS]               : () => void;
  [SocketClientToServerEvents.MORTIMER_IN_HALL]               : (inHall: boolean) => void;
  [SocketClientToServerEvents.SEARCH_FOR_MORTIMER_IN_HALL]    : () => void;
  [SocketClientToServerEvents.BETRAYAL]                       : () => void;
  [SocketClientToServerEvents.REST]                           : (acolyte: KaotikaPlayer) => void;
  [SocketClientToServerEvents.HEAL]                           : (acolyte: KaotikaPlayer, cure: string) => void;
  [SocketClientToServerEvents.CURSE]                          : (acolyte: KaotikaPlayer) => void;
  [SocketClientToServerEvents.INFECT]                         : (acolyte: KaotikaPlayer, illness: string) => void;
  [SocketClientToServerEvents.CAPTURE_ANGELO]                 : () => void;
  [SocketClientToServerEvents.DELIVER_ANGELO]                 : () => void;
  [SocketClientToServerEvents.RELEASE_ANGELO]                 : () => void;
  [SocketClientToServerEvents.VOTE]                           : (vote: boolean) => void;
  [SocketClientToServerEvents.START_TRIAL]                    : () => void;





  // TEST ONES
  [SocketClientToServerEventsForTesting.GET_FCM_MESSAGE]: (getSuccesfully: boolean) => void;

};

export type {
  ServerToClientEvents,
  ClientToServerEvents,
  AcolyteDataAfterAccessExitLab,
};
