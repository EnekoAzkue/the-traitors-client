import { View, Text } from "react-native";
import ScreenContainer from "./ScreenContainer";
import { Images } from "../../helpers/constants/constants";
import React from "react";
import ScanQR from "./ScanQR";
import QRCode from "./QR";

function Lab() {

  return (
    <ScreenContainer backgroundImg={Images.ACOLYTE_LAB}>
      <QRCode />
    </ScreenContainer>
  );
}


export default Lab;