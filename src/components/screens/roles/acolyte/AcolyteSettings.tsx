import React from "react";
import { View } from "react-native";
import Logout from "../../Logout";
import { Images } from "../../../../helpers/constants/constants";
import AcolyteScreenContainer from "./AcolyteScreenContainer";

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