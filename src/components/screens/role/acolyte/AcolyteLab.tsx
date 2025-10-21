import React from "react";
import { View, Text } from "react-native";
import { Images } from "../../../../helpers/constants/constants";
import ScanQR from "../../ScanQR";
import ScreenContainer from "../../ScreenContainer";

function AcolyteLab() {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>


      <View>
        <Text style={{fontFamily:''}}>Enter to Angelo's Domains</Text>
        <ScreenContainer backgroundImg={Images.ACOLYTE_LAB}>
          <ScanQR />
        </ScreenContainer>
      </View>

    </View>
  );
}


export default AcolyteLab;