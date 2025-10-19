import React from "react";
import { View, Text } from "react-native";
import ScreenContainer from "../../ScreenContainer";
import { Images } from "../../../../helpers/constants/constants";

function AcolyteHome() {

  return (
    <ScreenContainer backgroundImg={Images.ACOLYTE_HOME}> 
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style ={{ color: "white" }}>Acolyte Home</Text>
      </View>
    </ScreenContainer>
  );


}


export default AcolyteHome;