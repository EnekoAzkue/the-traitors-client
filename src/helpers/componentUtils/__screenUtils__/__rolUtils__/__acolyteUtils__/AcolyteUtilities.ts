import { socket } from "../../../../socket/socket";
import KaotikaPlayer from "../../../../interfaces/KaotikaPlayer";
import { Screens, SocketClientToServerEvents } from "../../../../constants/constants";


export function manageWithSocketsUserInTowerProperty (acolyteInitialScreen: string | null, user: KaotikaPlayer) {
  console.log('initianl screen:', acolyteInitialScreen);
  if (acolyteInitialScreen === Screens.ACOLYTE_TOWER) {
    socket.emit(SocketClientToServerEvents.UPDATE_INTOWER, user.email, true)
  } else {
    socket.emit(SocketClientToServerEvents.UPDATE_INTOWER, user.email, false)
  }
}