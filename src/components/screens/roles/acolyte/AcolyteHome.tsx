import React from "react";
import { View } from "react-native";
import AcolyteScreenContainer from "./AcolyteScreenContainer";
import { Images } from "../../../../helpers/constants/constants";

function AcolyteHome() {

  return (
    <AcolyteScreenContainer backgroundImage={Images.ACOLYTE_HOME} >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      </View>
    </AcolyteScreenContainer>
  );

}

export default AcolyteHome;