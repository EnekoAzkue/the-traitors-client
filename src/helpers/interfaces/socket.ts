import {
  SocketClientToServerEvents,
  SocketClientToServerEventsForTesting,
  SocketServerToClientEvents,
} from '../constants/constants';
import Artifact from './Artifact';
import { ArtifactListProps } from './ArtifactListProps';
import KaotikaPlayer from './KaotikaPlayer';

// Declaration of the events used when receiving events from the server
interface ServerToClientEvents {
  [SocketServerToClientEvents.ACOLYTE_INSIDE_OUTSIDE_LAB]: (
    acolyteData: AcolyteDataAfterAccessExitLab,
  ) => void;

  [SocketServerToClientEvents.SEND_UPDATED_PLAYER_TO_MORTIMER]: (
    acolyteData: any,
  ) => void;

  [SocketServerToClientEvents.UPDATE_USER_IN_CLIENT] : (
    acolyteData: any,
  ) => void;

  [SocketServerToClientEvents.RECIEVED_FOUND_SCROLL]: () => void;

  [SocketServerToClientEvents.SCROLL_VANISH]: () => void;

  [SocketServerToClientEvents.SENDING_ARTIFACTS] : (
    artifacts: Artifact[],
  ) => void;

  [SocketServerToClientEvents.GET_IN_SWAMP_ACOLYTES] : (inSwampAcolytes: KaotikaPlayer[]) => void;


  [SocketServerToClientEvents.COLLECTED]: () => void;
  
}

  
interface AcolyteDataAfterAccessExitLab {
  email: string;
  isInside: boolean;
  nickname: string;
  avatar: string;
}

// Declaration of the events used when sending events to the server
interface ClientToServerEvents {
  [SocketClientToServerEvents.CONNECTION_OPEN]: (userEmail: string) => void;
  [SocketClientToServerEvents.CONNECTION_CLOSE]: (userEmail: string) => void;
  [SocketClientToServerEvents.ACCESS_TO_EXIT_FROM_LAB]: (acolyteEmail: string) => void;
  [SocketClientToServerEvents.UPDATE_USER]: (acolyteEmail: string, changes: any) => void;
  [SocketClientToServerEvents.UPDATE_INTOWER]: (userEmail: string, inTower: boolean) => void;
  [SocketClientToServerEvents.SEND_NOTIFICATION_TO_MORTIMER]: (messsage: {}) => void;
  [SocketClientToServerEvents.SCROLL_VANISH]: (messsage: {}) => void;
  [SocketClientToServerEvents.SEND_FOUND_SCROLL]: () => void;
  [SocketClientToServerEvents.REQUEST_ARTIFACTS]: (userRol: string) => void;
  [SocketClientToServerEvents.REQUEST_SWAMP_ACOLYTES] : () => void;

  [SocketClientToServerEvents.COLLECT]: (artifactName: string) => void;


  // TEST ONES
  [SocketClientToServerEventsForTesting.GET_FCM_MESSAGE]: (getSuccesfully: boolean) => void;

}

export type {
  ServerToClientEvents,
  AcolyteDataAfterAccessExitLab,
  ClientToServerEvents,
};
