import styled from "styled-components/native";
import ScreenContainer from "../../ScreenContainer";
import React, { useContext, useEffect } from "react";
import { Images } from "../../../../helpers/constants/constants";
import { MortimerInitialScreenContext } from "../../../../helpers/contexts/contexts";

function MortimerHome() {

  // --- CONTEXT --- //
  const initialScreenContext = useContext(MortimerInitialScreenContext);

  if(!initialScreenContext) return null;

  const [, setInitialScreen] = initialScreenContext;
  
  // --- EFFECT --- //
  useEffect(() => {
      setInitialScreen("MortimerHome");
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