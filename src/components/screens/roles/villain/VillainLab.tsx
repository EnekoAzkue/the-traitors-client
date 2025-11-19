import React from "react";
import { View } from "react-native";
import { Images } from "../../../../helpers/constants/constants";
import ScreenContainer from "../../ScreenContainer";


export default function VillainLab() {
  return (
    <ScreenContainer backgroundImg={Images.VILLAIN_LAB}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      </View>
    </ScreenContainer>
  );

}