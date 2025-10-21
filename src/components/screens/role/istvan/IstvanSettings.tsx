import { View, Text } from "react-native";
import ScreenContainer from "../../ScreenContainer";
import { Images } from "../../../../helpers/constants/constants";
import React from "react";
import Logout from "../../Logout";
function Settings() {

  return (
    <ScreenContainer backgroundImg={Images.ISTVAN_SETTINGS}>
      <Logout />
    </ScreenContainer>
  );
}


export default Settings;