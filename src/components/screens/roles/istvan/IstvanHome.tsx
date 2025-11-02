import React from "react";
import { View, Text } from "react-native";
import ScreenContainer from "../../ScreenContainer";
import { Images, navigationTabMarginBottomForScreens } from "../../../../helpers/constants/constants";

function IstvanHome() {

  return (

    <View style={{ marginBottom: navigationTabMarginBottomForScreens }}>
      <ScreenContainer backgroundImg={Images.ISTVAN_HOME}>
      </ScreenContainer>

    </View>


  );
}




export default IstvanHome;