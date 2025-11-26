import React, { useContext, useEffect, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import styled from "styled-components/native";
import { Images, navigationTabMarginBottomForScreens } from "../../../../helpers/constants/constants";
import ScreenContainer from "../../../ScreenContainer";
import KaotikaPlayer from "../../../../helpers/interfaces/KaotikaPlayer";
import { AllAcolytesContext, MortimerInitialScreenContext } from "../../../../helpers/contexts/contexts";
import AcolyteTowerRegister from "./AcolyteTowerRegister";

function MortimerTower() {

  const allAcolytesContext = useContext(AllAcolytesContext);
  if (!allAcolytesContext) return <Text>User context is null at Home Component!!!"</Text>;
  const [acolytes, setAcolytes] = allAcolytesContext;

  const initialScreenContext = useContext(MortimerInitialScreenContext);
  if (!initialScreenContext) return null;
  const [initialScreen, setInitialScreen] = initialScreenContext;

  const [screen, setScreen] = useState(Dimensions.get("window"));

  useEffect(() => {
    setInitialScreen("MortimerTower");
  }, []);

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setScreen(window);
    });

    return () => subscription.remove();
  }, []);

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
    <View style={{ marginBottom: navigationTabMarginBottomForScreens }}>
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
    </View>
  );
}

export default MortimerTower;
