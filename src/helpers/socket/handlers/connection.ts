import { socket } from "../socket";
import { SocketClientToServerEvents } from '../../constants/constants';

function handleConnection(userEmail: string) {
  socket.emit(SocketClientToServerEvents.CONNECTION_OPEN, userEmail);
}

function handleDisconnection(userEmail: string = ''){

  if(userEmail) {
    console.log("SE METE TRÁS EL LOGOUT");
    socket.emit(SocketClientToServerEvents.CONNECTION_CLOSE, userEmail); 
  } else {
    socket.emit(SocketClientToServerEvents.CONNECTION_CLOSE, "NOT VALID USER"); 
  }
}

export { handleConnection, handleDisconnection};
