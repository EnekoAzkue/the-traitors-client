import styled from "styled-components/native";
import ScreenContainer from "../../ScreenContainer";
import React, { useContext, useEffect } from "react";
import { Images, Screens, SocketClientToServerEvents } from "../../../../helpers/constants/constants";
import { MortimerInitialScreenContext } from "../../../../helpers/contexts/contexts";
import { socket } from "../../../../helpers/socket/socket";
import AcolyteScreenContainer from "../acolyte/AcolyteScreenContainer";

function MortimerHome() {

  
  // --- EFFECT --- //
  useEffect(() => {
    socket.emit(SocketClientToServerEvents.MORTIMER_IN_HALL, false)
  }, []);

  // --- STYLED COMPONENTS --- //
  const StyledMortimerHome = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
  `;

  return (
    <AcolyteScreenContainer backgroundImage={Images.MORTIMER_HOME} >
      <StyledMortimerHome />
    </AcolyteScreenContainer>
  );
  
}

export default MortimerHome;