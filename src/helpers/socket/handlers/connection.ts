import { socket } from "../socket";
import { SocketClientToServerEvents } from '../../constants/constants';
import { use } from "react";

function handleConnection(userEmail: string) {
  socket.emit(SocketClientToServerEvents.CONNECTION_OPEN, userEmail);
}

function handleDisconnection(userEmail: string = ''){
  if(userEmail) socket.emit(SocketClientToServerEvents.CONNECTION_CLOSE, userEmail); 
}

export { handleConnection, handleDisconnection};
