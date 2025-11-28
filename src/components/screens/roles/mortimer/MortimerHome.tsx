import React, { useContext, useEffect } from "react";
import { View } from "react-native";
import ScreenContainer from "../../../ScreenContainer";
import { Images } from "../../../../helpers/constants/constants";
import { useMortimerInitialScreenStore } from "../../../../helpers/stores/useMortimerInitialScreenStore";

function MortimerHome() {
  const setMortimerInitialScreen = useMortimerInitialScreenStore(state => state.setMortimerInitialScreen);
  
  useEffect(() => {
    console.log('user');
      setMortimerInitialScreen("MortimerHome");
  }, []);

  return (
    <ScreenContainer backgroundImg={Images.MORTIMER_HOME}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      </View>
    </ScreenContainer>

  );
}




export default MortimerHome;