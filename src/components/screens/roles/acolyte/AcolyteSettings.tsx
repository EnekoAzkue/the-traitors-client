import React, { useState } from "react";
import { View } from "react-native";
import Logout from "../../Logout";
import { Images } from "../../../../helpers/constants/constants";
import AcolyteScreenContainer from "./AcolyteScreenContainer";


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