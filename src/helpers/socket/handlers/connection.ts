import { socket } from "../socket";
import { SocketClientToServerEvents } from '../../constants/constants';
import { use } from "react";

function handleConnection(userEmail: string) {

  // Una vez hecho socket.connect(), actualiza el usuario logeado en cliente para tener su propiedad socketID actualizada.
  socket.emit(SocketClientToServerEvents.CONNECTION_OPEN, userEmail);
  
}

function handleDisconnection(userEmail: string){
  if(userEmail) {
    // Borrar el valor almacenado en la propiedad del pushToken.
    socket.emit(SocketClientToServerEvents.UPDATE_USER, userEmail, {socketId: "", pushToken: ""});

    // Gestionar la desconexión del server.
    socket.emit(SocketClientToServerEvents.CONNECTION_CLOSE, userEmail);
  } 
}

export { handleConnection, handleDisconnection};
