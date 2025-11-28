import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { Images, navigationTabMarginBottomForScreens } from "../../../../helpers/constants/constants";
import ScreenContainer from "../../../ScreenContainer";
import AcolyteTowerRegister from "./AcolyteTowerRegister";
import { useMortimerInitialScreenStore } from "../../../../helpers/stores/useMortimerInitialScreenStore";
import { useScreenDimensions } from "../../../../helpers/stores/useScreenDimensionsStore";
import { useAllAcolytesStore } from "../../../../helpers/stores/useAllAcolytesStore";
import { getMortimerTowerScreenStyledComponents } from "../../../../componentStyles/screensStyles/roles/mortimer/MortimerTowerStyles";
import KaotikaPlayer from "../../../../helpers/interfaces/KaotikaPlayer";

function MortimerTower() {

  // --- ZUSTAND STORES --- //
  const acolytes = useAllAcolytesStore(st => st.allAcolytes);
  const setMortimerInitialScreen = useMortimerInitialScreenStore(state => state.setMortimerInitialScreen);
  const screenDimensions = useScreenDimensions(state => state.screenDimensions);
  if (!screenDimensions) return;

  useEffect(() => {
    setMortimerInitialScreen("MortimerTower");
  }, []);

  const renderAllAcolytesTowerRegister = (acolytes: KaotikaPlayer[] | undefined) => {
    if (acolytes) {
      return acolytes.map((acolyte, index) => (
        <AcolyteTowerRegister key={index} acolyte={acolyte} />
      ))
    }
    return <Text>NO USERS?</Text>

  }

  const { AcolytesRegisterScreenContainer, AcolytesRegisterListContainer } = getMortimerTowerScreenStyledComponents(screenDimensions);

  return (
    <View style={{ marginBottom: navigationTabMarginBottomForScreens }}>
      <ScreenContainer backgroundImg={Images.MORTIMER_TOWER}>
        <>

          <AcolytesRegisterScreenContainer>
            <AcolytesRegisterListContainer contentContainerStyle={{ alignItems: "center" }}>
              {renderAllAcolytesTowerRegister(acolytes)}
            </AcolytesRegisterListContainer>
          </AcolytesRegisterScreenContainer>
        </>
      </ScreenContainer>
    </View>
  );
}

export default MortimerTower;
