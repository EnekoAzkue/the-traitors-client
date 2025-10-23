import { socket } from "../socket";
import { SocketClientToServerEvents } from '../../constants/constants';
import { use } from "react";

function handleConnection(userEmail: string) {
  socket.emit(SocketClientToServerEvents.CONNECTION_OPEN, userEmail);
}

function handleDisconnection(userEmail: string = ''){
  const email = (userEmail) ?  userEmail : "NOT VALID USER";
  socket.emit(SocketClientToServerEvents.CONNECTION_CLOSE, email); 
}

export { handleConnection, handleDisconnection};
