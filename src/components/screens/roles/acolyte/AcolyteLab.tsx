import React from "react";
import { View, Text } from "react-native";
import { Images } from "../../../../helpers/constants/constants";
import ScanQR from "../../ScanQR";
import ScreenContainer from "../../ScreenContainer";
import QRCodeContainer from "../../QR";

function AcolyteLab() {

  return (

    <ScreenContainer backgroundImg={Images.ACOLYTE_LAB}>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <QRCodeContainer />
      </View>

    </ScreenContainer>
  );
}


export default AcolyteLab;