import { io, Socket } from 'socket.io-client';
import type {
  ServerToClientEvents,
  ClientToServerEvents,
} from '../interfaces/socket'
import { CURRENT_DOMAIN, SocketClientToServerEvents, SocketGeneralEvents } from '../constants/constants';
import { handleConnection, handleDisconnection } from './handlers/connection';
import KaotikaPlayer from '../interfaces/KaotikaPlayer';

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  CURRENT_DOMAIN,
  {
    autoConnect: false,
  },
);

function initSocket(user: KaotikaPlayer) {
  console.log("----------------------------------------------------------------------");
  console.log(`Creating a connection to server using SocketID with ${user.email} `);
  socket.connect();

  // Conecta el cliente con el server por medio de SokcetID
  handleConnection(user.email);

  // Nada más inicializar la conexión con socket, se obtiene el tokenID para los permisos de FCM y se actualiza el player para asignarselo tanto en DB como en el state user del client.
  handleFCMInitialization(user);

  console.log("----------------------------------------------------------------------");
}


// 
const handleFCMInitialization = (user: KaotikaPlayer) => {
  console.log(`Push Token val: [${user.pushToken}]`);
  socket.emit(SocketClientToServerEvents.UPDATE_USER, user.email , {pushToken: user.pushToken});
}

function performSocketCleanUp(userEmail: string = '') {
  // TODO: añadir los socket.off de los listeners lanzados
  handleDisconnection(userEmail);

  socket.off(SocketGeneralEvents.CONNECT);
  socket.disconnect();
}


export { socket, initSocket, performSocketCleanUp };