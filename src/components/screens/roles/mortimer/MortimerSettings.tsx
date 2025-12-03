import React, { useContext, useEffect } from "react";
import ScreenContainer from "../../ScreenContainer";
import { Images, Screens } from "../../../../helpers/constants/constants";
import Logout from "../../Logout";
import { MortimerInitialScreenContext } from "../../../../helpers/contexts/contexts";


function MortimerSettings() {

  // --- CONTEXTS --- //
  const initialScreenContext = useContext(MortimerInitialScreenContext);
  if(!initialScreenContext) return null;
  const setInitialScreen = initialScreenContext[1];
  
  // --- EFFECTS --- //
  useEffect(() => {
    setInitialScreen(Screens.MORTIMER_SETTINGS);
  }, []);

  return (
    <ScreenContainer backgroundImg={Images.MORTIMER_SETTINGS}>
      <Logout />
    </ScreenContainer>
  );
  
}

export default MortimerSettings;