import React from "react";
import { View } from "react-native";
import { Images } from "../../../../helpers/constants/constants";
import AcolyteScreenContainer from "../acolyte/AcolyteScreenContainer";

function VillainHome() {

  return (
      <AcolyteScreenContainer backgroundImage={Images.VILLAIN_HOME}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        </View>
      </AcolyteScreenContainer>
  );
}

export default VillainHome;