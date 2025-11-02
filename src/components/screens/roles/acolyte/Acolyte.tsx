import React, { useContext, useEffect } from "react";
import { useState } from "react";
import AcolyteMap from "./AcolyteMap";
import AcolyteNavigation from "./AcolyteNavigation";
import { Screens } from "../../../../helpers/constants/constants";
import { AcolyteInitialScreenContext } from "../../../../helpers/contexts/contexts";
import { Text } from "react-native";


export default function Acolyte() {


  const [isMapOpen, setisMapOpen] = useState<boolean | null>(null);
  const [initialScreen, setInitialScreen] = useState<string | null>(null);

  useEffect( () => {
    console.log(initialScreen);
  }, [initialScreen])

  return (
    <>

      <AcolyteInitialScreenContext.Provider value={[initialScreen, setInitialScreen]}>
        {
          
          (initialScreen === null) ?
            // Abrir el mapa para seleccionar ubicación
            <AcolyteMap />
            :
            // Abrir el navegador
            <AcolyteNavigation initialRouteScreen={initialScreen} />
        }
      </AcolyteInitialScreenContext.Provider>
    </>

  );


}