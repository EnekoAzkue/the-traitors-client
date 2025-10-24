import React from "react";
import { View, Text } from "react-native";
import { Images } from "../../../../helpers/constants/constants";
import ScreenContainer from "../../ScreenContainer";
import Logout from "../../Logout";


function VillainSettings(){

  return (
    <ScreenContainer backgroundImg={Images.VILLAIN_SETTINGS}>
      <Logout />
    </ScreenContainer>
  );
}


export default VillainSettings;