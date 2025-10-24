import React from "react";
import { View, Text } from "react-native";
import ScreenContainer from "../../ScreenContainer";
import { Images } from "../../../../helpers/constants/constants";

function MortimerHome() {

  return (
    <ScreenContainer backgroundImg={Images.MORTIMER_HOME}> 
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      </View>
    </ScreenContainer>
  );
}




export default MortimerHome;