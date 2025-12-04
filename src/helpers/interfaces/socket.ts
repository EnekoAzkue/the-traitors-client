import Artifact from './Artifact';
import KaotikaPlayer from './KaotikaPlayer';
import { GeolacationCoords, UserCoords } from './Geolocation';
import { SocketClientToServerEvents, SocketClientToServerEventsForTesting, SocketServerToClientEvents } from '../constants/constants';

// --- SERVER TO CLIENT SOCKECT EVENT DECLARATION --- //
interface ServerToClientEvents {

  [SocketServerToClientEvents.RECIEVED_FOUND_SCROLL]            : () => void;
  [SocketServerToClientEvents.SCROLL_VANISH]                    : () => void;
  [SocketServerToClientEvents.COLLECTED]                        : () => void;
  [SocketServerToClientEvents.SEND_UPDATED_PLAYER_TO_MORTIMER]  : ( acolyteData: any ) => void;
  [SocketServerToClientEvents.UPDATE_USER_IN_CLIENT]            : ( acolyteData: any ) => void;
  [SocketServerToClientEvents.SENDING_ARTIFACTS]                : ( artifacts: Artifact[] ) => void;
  [SocketServerToClientEvents.GET_IN_SWAMP_ACOLYTES]            : ( inSwampAcolytes: KaotikaPlayer[] ) => void;
  [SocketServerToClientEvents.ACOLYTE_INSIDE_OUTSIDE_LAB]       : ( acolyteData: AcolyteDataAfterAccessExitLab ) => void;
  [SocketServerToClientEvents.GET_ACOLYTE_NEW_COORDS]           : ( newCoords: {email: string, coords: GeolacationCoords} ) => void;

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

  // --- FOR TEST PURPOUSE --- //
  [SocketClientToServerEventsForTesting.GET_FCM_MESSAGE]        : ( getSuccesfully: boolean ) => void;

};

interface AcolyteDataAfterAccessExitLab {

  email     : string;
  isInside  : boolean;
  nickname  : string;
  avatar    : string;

};

export type {
  ServerToClientEvents,
  ClientToServerEvents,
  AcolyteDataAfterAccessExitLab,
};
