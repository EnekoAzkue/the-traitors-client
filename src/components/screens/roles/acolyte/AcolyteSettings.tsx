import React from "react";
import Logout from "../../Logout";
import { View } from "react-native";
import AcolyteScreenContainer from "./AcolyteScreenContainer";
import { Images } from "../../../../helpers/constants/constants";

function AcolyteSettings() {
  return (
    <AcolyteScreenContainer backgroundImage={Images.ACOLYTE_SETTINGS}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Logout />
      </View>
    </AcolyteScreenContainer>
  );
}

export default AcolyteSettings;