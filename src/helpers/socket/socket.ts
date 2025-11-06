import { io, Socket } from 'socket.io-client';
import type {
  ServerToClientEvents,
  ClientToServerEvents,
} from '../interfaces/socket'
import { CURRENT_DOMAIN, SocketClientToServerEvents, SocketGeneralEvents } from '../constants/constants';
import { handleConnection, handleDisconnection } from './handlers/connection';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  CURRENT_DOMAIN,
  {
    autoConnect: false,
  },
);

function initSocket(userEmail: string) {
  socket.connect();
  handleConnection(userEmail);
}

function performSocketCleanUp(userEmail: string = '') {
  handleDisconnection(userEmail);

  socket.off(SocketGeneralEvents.CONNECT);
  socket.disconnect();
}


export { socket, initSocket, performSocketCleanUp };