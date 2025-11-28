import Logout from "../../Logout";
import { View } from "react-native";
import React, { useState } from "react";
import AcolyteScreenContainer from "./AcolyteScreenContainer";
import { Images } from "../../../../helpers/constants/constants";


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