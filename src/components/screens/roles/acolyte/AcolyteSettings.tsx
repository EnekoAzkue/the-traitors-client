import React from "react";
import { View, Text } from "react-native";
import ScreenContainer from "../../ScreenContainer";
import Logout from "../../Logout";
import { Images, navigationTabMarginBottomForScreens } from "../../../../helpers/constants/constants";


function AcolyteSettings() {

  return (
    <ScreenContainer backgroundImg={Images.ACOLYTE_SETTINGS}>
      <Logout />
    </ScreenContainer>
  );
}


export default AcolyteSettings;