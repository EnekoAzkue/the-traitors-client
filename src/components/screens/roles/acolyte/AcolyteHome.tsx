import React, { use, useEffect } from "react";
import { View } from "react-native";
import AcolyteScreenContainer from "./AcolyteScreenContainer";
import { Images } from "../../../../helpers/constants/constants";
import { Text } from "react-native-svg";

function AcolyteHome() {

  useEffect(() => {console.log("acolyte home")}, []);

  return (
    <>
    <AcolyteScreenContainer backgroundImage={Images.ACOLYTE_HOME} >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      </View>
    </AcolyteScreenContainer>
    </>
  );

}

export default AcolyteHome;