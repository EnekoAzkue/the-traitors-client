import React from "react";
import { View } from "react-native";
import { Images } from "../../../../helpers/constants/constants";
import AcolyteScreenContainer from "../acolyte/AcolyteScreenContainer";


export default function VillainLab() {
  return (
    <AcolyteScreenContainer backgroundImage={Images.VILLAIN_LAB}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      </View>
    </AcolyteScreenContainer>
  );

}