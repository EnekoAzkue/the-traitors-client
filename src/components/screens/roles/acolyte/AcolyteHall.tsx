import React from "react";
import { View } from "react-native";
import { Images } from "../../../../helpers/constants/constants";
import AcolyteScreenContainer from "./AcolyteScreenContainer";

function AcolyteHome() {

  return (
    <AcolyteScreenContainer backgroundImage={Images.HALL_OF_SAGES} >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      </View>
    </AcolyteScreenContainer>
  );
}

export default AcolyteHome;