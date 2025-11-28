import React, { useContext, useEffect, useState } from "react";
import { Text, Dimensions } from "react-native";
import { Images } from "../../../../helpers/constants/constants";
import ScreenContainer from "../../../ScreenContainer";
import styled from "styled-components/native";
import AcolyteLabRegister from "./AcolyteLabRegister";
import { useMortimerInitialScreenStore } from "../../../../helpers/stores/useMortimerInitialScreenStore";
import { useAllAcolytesStore } from "../../../../helpers/stores/useAllAcolytesStore";
import { useScreenDimensions } from "../../../../helpers/stores/useScreenDimensionsStore";

function MortimerLab() {


  // --- ZUSTAND STORES --- //
  const acolytes  = useAllAcolytesStore( state => state.allAcolytes);
  const setMortimerInitialScreen = useMortimerInitialScreenStore( (state) => state.setMortimerInitialScreen);
  const screenDimensions = useScreenDimensions( (state) => state.screenDimensions );

  if (!screenDimensions) return;
  const { width, height } = screenDimensions;

  useEffect(() => {
    setMortimerInitialScreen("MortimerLab");
  }, []);

  const AcolytesRegisterScreenContainer = styled.View`
    align-items: center; 
    flex: 1; 
    width: ${width}px;
    height: ${height * 0.91}px;
    margin-top: ${height * 0.01}px;
    position: absolute;
  `;

    const AcolytesRegisterListContainer = styled.ScrollView`
    flex: 1;
    width: ${width * 0.99}px;
    height: ${height * 0.91}px;
    border: 1px solid rgba(223, 107, 40, 1);
    border-radius: 8px;
    background-color: rgba(0,0,0,0.3);
  `;

  return (
    <ScreenContainer backgroundImg={Images.MORTIMER_LAB}>
      <>

        <AcolytesRegisterScreenContainer>
          <AcolytesRegisterListContainer contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}>
            {acolytes
              ? acolytes.map((acolyte, index) => (
                  <AcolyteLabRegister key={index} acolyte={acolyte} />
                ))
              : <Text>NO USERS?</Text>}
          </AcolytesRegisterListContainer>
        </AcolytesRegisterScreenContainer>
      </>
    </ScreenContainer>
  );
}

export default MortimerLab;
