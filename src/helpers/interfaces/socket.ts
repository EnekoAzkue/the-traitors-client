import {
  SocketClientToServerEvents,
  SocketServerToClientEvents,
} from '../constants/constants';

// Declaration of the events used when receiving events from the server
interface ServerToClientEvents {
  [SocketServerToClientEvents.ACOLYTE_INSIDE_OUTSIDE_LAB]: (
    acolyteData: AcolyteDataAfterAccessExitLab,
  ) => void;

  [SocketServerToClientEvents.SEND_UPDATED_PLAYER_TO_MORTIMER]: (
    acolyteData: any,
  ) => void;
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
  [SocketClientToServerEvents.ACCESS_TO_EXIT_FROM_LAB]: (
    acolyteEmail: string
  ) => void;
}

export type {
  ServerToClientEvents,
  AcolyteDataAfterAccessExitLab,
  ClientToServerEvents,
};
