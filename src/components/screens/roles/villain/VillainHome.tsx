import React from "react";
import { View, Text } from "react-native";
import ScreenContainer from "../../ScreenContainer";
import { Images } from "../../../../helpers/constants/constants";

function VillainHome() {

  return (
    <ScreenContainer backgroundImg={Images.VILLAIN_HOME}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style ={{ color: "white" }}>Villain Home</Text>
      </View>
    </ScreenContainer>
  );
}

export default VillainHome;