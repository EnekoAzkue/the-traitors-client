import React, { useContext, useState } from "react";
import { View, Text } from "react-native";
import ScreenContainer from "../../ScreenContainer";
import Logout from "../../Logout";
import { Images, navigationTabMarginBottomForScreens } from "../../../../helpers/constants/constants";
import IconButton from "../../IconButton";
import AcolyteScreenContainer from "./AcolyteScreenContainer";
import { UserContext } from "../../../../helpers/contexts/contexts";


function AcolyteSettings() {
    const [backgroundImg, setBackgroundImg] = useState(Images.ACOLYTE_SETTINGS);

  return (
    <AcolyteScreenContainer backgroundImage={backgroundImg}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Logout />
      </View>
    </AcolyteScreenContainer>
  );
}


export default AcolyteSettings;