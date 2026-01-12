import styled from "styled-components/native";
import React, { useContext, useEffect } from "react";
import AcolyteLabRegister from "./AcolyteLabRegister";
import { Text, useWindowDimensions, View } from "react-native";
import { Images, SocketClientToServerEvents } from "../../../../helpers/constants/constants";
import { AllAcolytesContext, LoyalAcolytesContext } from "../../../../helpers/contexts/contexts";
import { socket } from "../../../../helpers/socket/socket";
import AcolyteScreenContainer from "../acolyte/AcolyteScreenContainer";

function MortimerLab() {

  // --- CONTEXTS & COMPONENT CONSTANTS --- //
  const allAcolytesContext = useContext(AllAcolytesContext);
  const loyalAcolytesContext = useContext(LoyalAcolytesContext);

  if (!allAcolytesContext) return;
  if (!loyalAcolytesContext) return;

  const acolytes = allAcolytesContext[0];
  const loyalAcolytes = loyalAcolytesContext[0];

  const { width, height } = useWindowDimensions();

  // --- EFFECTS --- //
  useEffect(() => {
    socket.emit(SocketClientToServerEvents.MORTIMER_IN_HALL, false)
  }, []);

  // --- STYLED COMPONENTS --- //
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
    <AcolyteScreenContainer backgroundImage={Images.MORTIMER_LAB}>
      <AcolytesRegisterScreenContainer>
        <AcolytesRegisterListContainer contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}>
          {loyalAcolytes
            ? loyalAcolytes.map((acolyte, index) => (
              <View key={index}>
                {!acolyte.isBetrayer && <AcolyteLabRegister acolyte={acolyte} />}
              </View>
            ))
            : <Text>NO USERS?</Text>}
        </AcolytesRegisterListContainer>
      </AcolytesRegisterScreenContainer>
    </AcolyteScreenContainer>
  );

}

export default MortimerLab;