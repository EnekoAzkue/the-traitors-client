import React from "react";
import { View, Text } from "react-native";
import { Images, navigationTabMarginBottomForScreens } from "../../../../helpers/constants/constants";
import ScreenContainer from "../../ScreenContainer";


export default function VillainLab() {
  return (
    <View style={{ marginBottom: navigationTabMarginBottomForScreens }}>
      <ScreenContainer backgroundImg={Images.VILLAIN_LAB}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: "white" }}>Villain Lab</Text>
        </View>
      </ScreenContainer>
    </View>


  );

}