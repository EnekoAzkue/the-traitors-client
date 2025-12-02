import styled from "styled-components/native";
import ScreenContainer from "../../ScreenContainer";
import AcolyteTowerRegister from "./AcolyteTowerRegister";
import React, { useContext, useEffect, useState } from "react";
import { Images } from "../../../../helpers/constants/constants";
import { Text, Dimensions, useWindowDimensions } from "react-native";
import { AllAcolytesContext, MortimerInitialScreenContext } from "../../../../helpers/contexts/contexts";

function MortimerTower() {

  // --- STATES & CONTEXTS --- //
  const [screen, setScreen] = useState(useWindowDimensions());
  const allAcolytesContext = useContext(AllAcolytesContext);
  const initialScreenContext = useContext(MortimerInitialScreenContext);

  if (!allAcolytesContext) return;
  if (!initialScreenContext) return;

  const [acolytes] = allAcolytesContext;
  const [, setInitialScreen] = initialScreenContext;

  // --- EFFECTS --- //
  useEffect(() => {
    setInitialScreen("MortimerTower");
  }, []);

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setScreen(window);
    });

    return () => subscription.remove();
  }, []);

  // --- COMPONENT STYLES --- //
  const { width, height } = screen;

  const AcolytesRegisterScreenContainer = styled.View`
    align-items: center; 
    flex: 1; 
    width: ${width}px;
    height: ${height * 0.9}px;
    margin-top: ${height * 0.01}px;
    position: absolute;
  `;

  const AcolytesRegisterListContainer = styled.ScrollView`
    flex: 1;
    width: ${width * 0.9}px;
    height: ${height * 0.1}px;
    border: 1px solid rgba(85, 0, 134, 1);
    border-radius: 8px;
    background-color: rgba(0,0,0,0.3);
  `;

  return (
    <ScreenContainer backgroundImg={Images.MORTIMER_TOWER}>
      <>
        <AcolytesRegisterScreenContainer>
          <AcolytesRegisterListContainer contentContainerStyle={{ alignItems: "center" }}>
            {acolytes
              ? acolytes.map((acolyte, index) => (
                <AcolyteTowerRegister key={index} acolyte={acolyte} />
              ))
              : <Text>NO USERS?</Text>}
          </AcolytesRegisterListContainer>
        </AcolytesRegisterScreenContainer>
      </>
    </ScreenContainer>
  );
  
}

export default MortimerTower;
