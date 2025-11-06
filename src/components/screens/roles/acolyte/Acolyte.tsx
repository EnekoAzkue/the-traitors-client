import React, { useContext, useEffect } from "react";
import { useState } from "react";
import AcolyteMap from "./AcolyteMap";
import AcolyteNavigation from "./AcolyteNavigation";
import { Images, Screens } from "../../../../helpers/constants/constants";
import { AcolyteInitialScreenContext } from "../../../../helpers/contexts/contexts";
import { Text } from "react-native";


export default function Acolyte() {
  const initialScreenContext = useContext(AcolyteInitialScreenContext)
  if (!initialScreenContext) return;
  const [initialScreen, setInitialScreen] = initialScreenContext;

  useEffect(() => {
    console.log('initianl screen:', initialScreen);
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