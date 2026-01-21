import { Text, useWindowDimensions, View } from "react-native";
import { Images, INN_STATES, Locations, Roles, Screens, SocketClientToServerEvents } from "../../../../helpers/constants/constants";
import { socket } from "../../../../helpers/socket/socket";
import { useInnStore } from "../../../../helpers/stores/useInnStateStore";
import { useUserStore } from "../../../../helpers/stores/useUserStore";
import BetrayerModal from "../../../BetrayerModal";
import Button from "../../../Button";
import AcolyteTowerContainer from "./AcolyteTowerContainer";
import React, { useContext, useEffect, useState } from "react";
import { AcolyteInitialScreenContext } from "../../../../helpers/contexts/contexts";
import { useAcolytesCurrentNavigationTabStore } from "../../../../helpers/stores/useAcolytesCurrentNavigationTabStore";
import { useAngeloStore } from "../../../../helpers/stores/useAngeloStore";

function AcolyteInn() {

  // --- CONTEXTS && STORES --- //
  const { innState, setInnState } = useInnStore(state => state);
  const user = useUserStore(state => state.user);
  const { width, height } = useWindowDimensions();
  const initialRouterScreen = useContext(AcolyteInitialScreenContext);
  const setInitialRouteScreen = useAcolytesCurrentNavigationTabStore(state => state.setAcolyteCurrentTabNavigation);
  const angelo = useAngeloStore(state => state.angelo);

  
  if (!initialRouterScreen) return (<Text>ERROR! Initial Router Context not got</Text>);
  
  const setInitialScreen = initialRouterScreen[1];
  
  // --- STATES --- //
  const [backgroundImage, setBackgroundImage] = useState(Images.ACOLYTE_INN_BASE);
  
  if (!user) return null;
  if (!angelo) return null;
  
  // --- EFFECTS --- //
  useEffect(() => {
    if (user.isBetrayer) {
      setInnState(INN_STATES.INSIDE_INN_BETRAYER);
    } else {
      setInnState(INN_STATES.SHOW_BETRAYER_MODAL);
    }
    setInitialRouteScreen(Screens.MAP)
  }, []);

  useEffect(() => {
    console.log("Current Inn State: ");
    console.log(innState);
    switch (innState) {
      case (INN_STATES.SHOW_BETRAYER_MODAL): // 0
        setBackgroundImage(Images.ACOLYTE_INN_BASE);
        break;

      case (INN_STATES.INSIDE_INN_BETRAYER): // 1
        setBackgroundImage(Images.ACOLYTE_INN_TRAITORS);
      break;      
      
      case (INN_STATES.INSIDE_INN_LOYAL):    // 2
        setBackgroundImage(Images.ACOLYTE_INN_LOYAL);
      break;

    }

  }, [innState]);

  // --- FUNCTIONS --- // 
  const captureAngelo = () => {
    console.log("Capture Angelo button pressed");
    socket.emit(SocketClientToServerEvents.CAPTURE_ANGELO);
    setInitialScreen(Screens.SCHOOL_MAP)
  };

  return (
    <>
      {((innState === INN_STATES.SHOW_BETRAYER_MODAL && user.rol === Roles.ACOLYTE) &&
        <BetrayerModal />
      )}
      <AcolyteTowerContainer backgroundImage={backgroundImage} >
      {user.rol === Roles.ACOLYTE && !user.isBetrayer && innState === INN_STATES.INSIDE_INN_LOYAL && angelo.location === Locations.INN  && (
        <View style={{ width: width, height: height, alignItems: "center" }}>
          <Button buttonText={"Capture Angelo"} onPress={captureAngelo} />
        </View>
      )}
      </AcolyteTowerContainer>
    </>
  );
}

export default AcolyteInn;
