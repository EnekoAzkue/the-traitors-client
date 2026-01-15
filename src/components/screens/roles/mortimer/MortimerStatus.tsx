import ScreenContainer from "../../ScreenContainer";
import React, { useContext, useState } from "react";
import { Images } from "../../../../helpers/constants/constants";
import { useWindowDimensions, View } from "react-native";
import styled from "styled-components/native";
import LoyalsStatus from "../../LoyalsStatus";
import StatusModal from "../../../StatusModal";
import KaotikaPlayer from "../../../../helpers/interfaces/KaotikaPlayer";
import { useLoyalsStore } from "../../../../helpers/stores/useLoyalsStore";

function MortimerStatus() {

  const [showModal, setShowModal] = useState<boolean>(false)
  const [selectedAcolyte, setSelectedAcolyte] = useState<KaotikaPlayer | null>(null)

  const loyalAcolytes = useLoyalsStore(state => state.loyals);

  const { width, height } = useWindowDimensions()

  const AcolyteContainer = styled.View`
    background: rgba(0,0,0,0.9);
    padding: ${height * 0.01}px ${width * 0.05}px;
    marginTop: ${height * 0.03}px;
    borderRadius: 9px;
    width: ${width * 0.9};
    alignItems: center;
    border: 3px solid white;

  `

  return (
    <ScreenContainer backgroundImg={Images.STATUS} >
      <View style={{ flex: 1, alignItems: 'center' }}>
        <AcolyteContainer>
          {loyalAcolytes
            && loyalAcolytes.map((acolyte, index) => (
              <View key={index}>
                <LoyalsStatus key={index} acolyte={acolyte} setShowModal={setShowModal} setSelectedAcolyte={setSelectedAcolyte}/>
              </View>
            ))}
        </AcolyteContainer>
      </View>
      {showModal && <StatusModal acolyte={selectedAcolyte} setShowModal={setShowModal} />}

    </ScreenContainer>
  );

}

export default MortimerStatus;