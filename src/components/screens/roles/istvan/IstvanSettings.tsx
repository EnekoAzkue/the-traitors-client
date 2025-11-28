import React from "react";
import Logout from "../../Logout";
import ScreenContainer from "../../../ScreenContainer";
import { View } from "react-native";
import { Images } from "../../../../helpers/constants/constants";

function Settings() {
  return (
    <View>
      <ScreenContainer backgroundImg={Images.ISTVAN_SETTINGS}>
        <Logout />
      </ScreenContainer>
    </View>
  );
}


export default Settings;