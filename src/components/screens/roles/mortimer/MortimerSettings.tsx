import React, { useContext } from "react";
import ScreenContainer from "../../ScreenContainer";
import { Images } from "../../../../helpers/constants/constants";
import Logout from "../../Logout";
import { MortimerInitialScreenContext } from "../../../../helpers/contexts/contexts";


function MortimerSettings() {

  const initialScreenContext = useContext(MortimerInitialScreenContext);
  if(!initialScreenContext) return null;
  const [initialScreen, setInitialScreen] = initialScreenContext;
  
  setInitialScreen("MortimerSettings");

  return (
    <ScreenContainer backgroundImg={Images.MORTIMER_SETTINGS}>
      <Logout />
    </ScreenContainer>
  );

}


export default MortimerSettings;