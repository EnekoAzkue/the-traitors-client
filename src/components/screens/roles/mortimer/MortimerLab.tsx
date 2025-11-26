import React, { useContext, useEffect, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { Images } from "../../../../helpers/constants/constants";
import ScreenContainer from "../../../ScreenContainer";
import styled from "styled-components/native";
import AcolyteLabRegister from "./AcolyteLabRegister";
import KaotikaPlayer from "../../../../helpers/interfaces/KaotikaPlayer";
import { AllAcolytesContext, MortimerInitialScreenContext } from "../../../../helpers/contexts/contexts";

function MortimerLab() {

  const allAcolytesContext = useContext(AllAcolytesContext);
  if (!allAcolytesContext) return <Text>User context is null at Home Component!!!"</Text>;
  const [acolytes, setAcolytes] = allAcolytesContext;

  const initialScreenContext = useContext(MortimerInitialScreenContext);
  if (!initialScreenContext) return null;
  const [initialScreen, setInitialScreen] = initialScreenContext;

  useEffect(() => {
    setInitialScreen("MortimerLab");
  }, []);

  const [screen, setScreen] = useState(Dimensions.get("window"));

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
