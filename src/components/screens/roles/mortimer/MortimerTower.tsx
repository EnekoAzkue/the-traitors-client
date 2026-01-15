import styled from "styled-components/native";
import ScreenContainer from "../../ScreenContainer";
import AcolyteTowerRegister from "./AcolyteTowerRegister";
import React, { useContext, useEffect, useState } from "react";
import { Images, SocketClientToServerEvents } from "../../../../helpers/constants/constants";
import { Text, Dimensions, useWindowDimensions, View } from "react-native";
import { MortimerInitialScreenContext } from "../../../../helpers/contexts/contexts";
import { socket } from "../../../../helpers/socket/socket";
import { useLoyalsStore } from "../../../../helpers/stores/useLoyalsStore";
import AcolyteTowerContainer from "../acolyte/AcolyteTowerContainer";

function MortimerTower() {

  // --- STATES & CONTEXTS --- //
  const [screen, setScreen] = useState(useWindowDimensions());
  const initialScreenContext = useContext(MortimerInitialScreenContext);

  if (!initialScreenContext) return;

  const loyalAcolytes = useLoyalsStore(state => state.loyals);
  const setInitialScreen = initialScreenContext[1];

  // --- EFFECTS --- //
  useEffect(() => {
    socket.emit(SocketClientToServerEvents.MORTIMER_IN_HALL, false)

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
    <AcolyteTowerContainer backgroundImage={Images.MORTIMER_TOWER}>
      <>
        <AcolytesRegisterScreenContainer>
          <AcolytesRegisterListContainer contentContainerStyle={{ alignItems: "center" }}>
            {loyalAcolytes
              ? loyalAcolytes.map((acolyte, index) => (
                <View key={index}>
                  {!acolyte.isBetrayer && <AcolyteTowerRegister key={index} acolyte={acolyte} />}
                </View>
              ))
              : <Text>NO USERS?</Text>}
          </AcolytesRegisterListContainer>
        </AcolytesRegisterScreenContainer>
      </>
    </AcolyteTowerContainer>
  );
  
}

export default MortimerTower;
