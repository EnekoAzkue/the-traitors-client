import React, { useContext, useEffect } from "react";
import ScreenContainer from "../../../ScreenContainer";
import { Images } from "../../../../helpers/constants/constants";
import Logout from "../../Logout";
import { useMortimerInitialScreenStore } from "../../../../helpers/stores/useMortimerInitialScreenStore";


function MortimerSettings() {

  // --- ZUSTAND STORES --- //
  const setMortimerInitialScreen = useMortimerInitialScreenStore( state => state.setMortimerInitialScreen);
  
  useEffect(() => {
    setMortimerInitialScreen("MortimerSettings");
  }, []);

  return (
    <ScreenContainer backgroundImg={Images.MORTIMER_SETTINGS}>
      <Logout />
    </ScreenContainer>
  );

}


export default MortimerSettings;