import styled from "styled-components/native";
import ScreenContainer from "../../ScreenContainer";
import React, { useContext, useEffect } from "react";
import { Images, Screens, SocketClientToServerEvents } from "../../../../helpers/constants/constants";
import { MortimerInitialScreenContext } from "../../../../helpers/contexts/contexts";
import { socket } from "../../../../helpers/socket/socket";

function MortimerHome() {

  // --- CONTEXT --- //
  const initialScreenContext = useContext(MortimerInitialScreenContext);

  if(!initialScreenContext) return null;

  const setInitialScreen = initialScreenContext[1];
  
  // --- EFFECT --- //
  useEffect(() => {
    socket.emit(SocketClientToServerEvents.MORTIMER_IN_HALL, false)
      setInitialScreen(Screens.MORTIMER_HOME);
  }, []);

  // --- STYLED COMPONENTS --- //
  const StyledMortimerHome = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
  `;

  return (
    <ScreenContainer backgroundImg={Images.MORTIMER_HOME}>
      <StyledMortimerHome />
    </ScreenContainer>
  );
  
}

export default MortimerHome;