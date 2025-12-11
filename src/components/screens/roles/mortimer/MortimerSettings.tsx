import React, { useContext, useEffect } from "react";
import ScreenContainer from "../../ScreenContainer";
import { Images, Screens, SocketClientToServerEvents } from "../../../../helpers/constants/constants";
import Logout from "../../Logout";
import { MortimerInitialScreenContext } from "../../../../helpers/contexts/contexts";
import { socket } from "../../../../helpers/socket/socket";


function MortimerSettings() {

  // --- CONTEXTS --- //
  const initialScreenContext = useContext(MortimerInitialScreenContext);
  if(!initialScreenContext) return null;
  const setInitialScreen = initialScreenContext[1];
  
  // --- EFFECTS --- //
  useEffect(() => {
    socket.emit(SocketClientToServerEvents.MORTIMER_IN_HALL, false)
    setInitialScreen(Screens.MORTIMER_SETTINGS);
  }, []);

  return (
    <ScreenContainer backgroundImg={Images.MORTIMER_SETTINGS}>
      <Logout />
    </ScreenContainer>
  );
  
}

export default MortimerSettings;