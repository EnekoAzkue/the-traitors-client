import React from "react";
import { View, Text } from "react-native";
import { Images } from "../../../../helpers/constants/constants";
import ScreenContainer from "../../ScreenContainer";

function MortimerLab() {

  return (
    <ScreenContainer backgroundImg={Images.MORTIMER_LAB}> 
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      </View>
    </ScreenContainer>
  );
}


export default MortimerLab;