import React from "react";
import { View, Text } from "react-native";
import ScreenContainer from "../../ScreenContainer";
import { Images, navigationTabMarginBottomForScreens } from "../../../../helpers/constants/constants";
import Logout from "../../Logout";


function MortimerSettings() {

  return (

    <View style={{ marginBottom: navigationTabMarginBottomForScreens }}>
      <ScreenContainer backgroundImg={Images.MORTIMER_SETTINGS}>
        <Logout />
      </ScreenContainer>
    </View>


  );

}


export default MortimerSettings;