import React, { use, useContext, useEffect } from "react";
import { useState } from "react";
import AcolyteMap from "./AcolyteMap";
import AcolyteNavigation from "./AcolyteNavigation";
import { Images, Screens, SocketClientToServerEvents } from "../../../../helpers/constants/constants";
import { AcolyteInitialScreenContext, UserContext } from "../../../../helpers/contexts/contexts";
import { Text } from "react-native";
import { socket } from "../../../../helpers/socket/socket";


export default function Acolyte() {
  const userContext = useContext(UserContext)
  if(!userContext) return;
  const [user] = userContext;
  const initialScreenContext = useContext(AcolyteInitialScreenContext)
  if (!initialScreenContext) return;
  const [initialScreen, setInitialScreen] = initialScreenContext;

  useEffect(() => {
    // console.log('initianl screen:', initialScreen);
    if(initialScreen === Screens.ACOLYTE_TOWER) {
      socket.emit(SocketClientToServerEvents.UPDATE_INTOWER, user.email, true)
    } else {
      socket.emit(SocketClientToServerEvents.UPDATE_INTOWER, user.email, false)
    } 

  }, [initialScreen])


  return (
    <>
      {
        (initialScreen === null) ?
          // Abrir el mapa para seleccionar ubicación
          <AcolyteMap />
          :
          // Abrir el navegador
          <AcolyteNavigation initialRouteScreen={initialScreen} />
      }
    </>

  );


}