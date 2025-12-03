import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { Images } from "../../../../helpers/constants/constants";
import QRCodeContainer from "../../QR";
import AcolyteScreenContainer from "./AcolyteScreenContainer";
import { useUserStore } from "../../../../helpers/stores/useUserStore";

function AcolyteLab() {
  // --- STATES, STORES && CONSTANTS --- //
  const user = useUserStore( state => state.user );
  const [backgroundImg, setBackgroundImg] = useState(Images.ACOLYTE_LAB);

  if (!user) return;

  // --- EFFECTS --- //
  useEffect(() => {
    if (user.isInside) {
      setBackgroundImg(Images.ACOLYTE_LAB_INSIDE);
      return;
    } else {
      setBackgroundImg(Images.ACOLYTE_LAB);
    }
  }, [user]);

  return (
    <AcolyteScreenContainer backgroundImage={backgroundImg}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <QRCodeContainer />
      </View>
    </AcolyteScreenContainer>
  );
}

export default AcolyteLab;