import { View } from "react-native";
import QRCodeContainer from "../../../QR";
import React, { useEffect, useState } from "react";
import AcolyteScreenContainer from "./AcolyteScreenContainer";
import { Images } from "../../../../helpers/constants/constants";
import { useUserStore } from "../../../../helpers/stores/useUserStore";
import { manageAcolyteLabAccess } from "../../../../helpers/componentUtils/__screenUtils__/__rolUtils__/__acolyteUtils__/AcolyteLabUtilities";

function AcolyteLab() {
  const [backgroundImg, setBackgroundImg] = useState(Images.ACOLYTE_LAB);
  const [accesedIn, setAccesedIn] = useState<boolean>(false);

  const user = useUserStore( state => state.user);
  if(!user) return;

  useEffect(() => {
    manageAcolyteLabAccess({user, setBackgroundImg, setAccesedIn});
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