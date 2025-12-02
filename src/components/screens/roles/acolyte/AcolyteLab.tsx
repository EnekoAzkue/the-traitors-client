import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { Images } from "../../../../helpers/constants/constants";
import QRCodeContainer from "../../QR";
import { UserContext } from "../../../../helpers/contexts/contexts";
import AcolyteScreenContainer from "./AcolyteScreenContainer";

function AcolyteLab() {
  // --- CONTEXTS --- //
  const userContext = useContext(UserContext);
  const [backgroundImg, setBackgroundImg] = useState(Images.ACOLYTE_LAB);

  // --- STATES --- //
  const [, setAccesedIn] = useState<boolean>(false);

  // --- EFFECTS --- //
  useEffect(() => {
    if (!userContext) return;

    const [user] = userContext;

    if (user.isInside) {
      setBackgroundImg(Images.ACOLYTE_LAB_INSIDE)
      setAccesedIn(true);
      return;
    } else {
      setBackgroundImg(Images.ACOLYTE_LAB);
    }
  }, [userContext]);

  return (
    <AcolyteScreenContainer backgroundImage={backgroundImg}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <QRCodeContainer />
      </View>
    </AcolyteScreenContainer>
  );
}

export default AcolyteLab;