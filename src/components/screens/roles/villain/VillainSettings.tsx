import React from "react";
import { View, Text } from "react-native";
import { Images, navigationTabMarginBottomForScreens } from "../../../../helpers/constants/constants";
import ScreenContainer from "../../ScreenContainer";
import Logout from "../../Logout";


function VillainSettings(){

  return (
    <View style={{ marginBottom: navigationTabMarginBottomForScreens }}>
      <ScreenContainer backgroundImg={Images.VILLAIN_SETTINGS}>
        <Logout />
      </ScreenContainer>
    </View>
  );
}


export default VillainSettings;