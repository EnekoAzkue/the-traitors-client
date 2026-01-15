import styled from "styled-components/native";
import React, { useEffect } from "react";
import AcolyteLabRegister from "./AcolyteLabRegister";
import { Text, useWindowDimensions, View } from "react-native";
import { Images, SocketClientToServerEvents } from "../../../../helpers/constants/constants";
import { socket } from "../../../../helpers/socket/socket";
import AcolyteScreenContainer from "../acolyte/AcolyteScreenContainer";
import { useAcolytesStore } from "../../../../helpers/stores/useAcolytesStore";
import { useLoyalsStore } from "../../../../helpers/stores/useLoyalsStore";

function MortimerLab() {

  // --- CONTEXTS & COMPONENT CONSTANTS --- //
  const acolytes = useAcolytesStore(state => state.allAcolytes);
  const loyalAcolytes = useLoyalsStore(state => state.loyals);

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