import React from "react";
import Logout from "../../Logout";
import { View } from "react-native";
import { Images } from "../../../../helpers/constants/constants";
import ScreenContainer from "../../ScreenContainer";

function AcolyteSettings() {
  return (
    <ScreenContainer backgroundImg={Images.ACOLYTE_SETTINGS}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Logout />
      </View>
    </ScreenContainer>
  );
}

export default AcolyteSettings;