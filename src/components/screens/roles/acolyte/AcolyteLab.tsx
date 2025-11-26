import React, { useEffect, useState } from "react";
import QRCodeContainer from "../../../QR";
import AcolyteScreenContainer from "./AcolyteScreenContainer";
import { View } from "react-native";
import { Images  } from "../../../../helpers/constants/constants";
import { useUserStore } from "../../../../helpers/stores/useUserStore";

function AcolyteLab() {
  const [backgroundImg, setBackgroundImg] = useState(Images.ACOLYTE_LAB);
  const [accesedIn, setAccesedIn] = useState<boolean>(false);

  const {user, setUser} = useUserStore();
  if(!user) return;

  useEffect(() => {

    if (user.isInside) {
      console.log(`is user inside lab? ${user.isInside}`)
      // setBackgroundImg(Images.ACOLYTE_LAB_OPEN);
      // setTimeout(() => {
      //   setBackgroundImg(Images.ACOLYTE_LAB_INSIDE);
      // }, 1200);
      setBackgroundImg(Images.ACOLYTE_LAB_INSIDE)
      setAccesedIn(true);
      return;
    } else {
      console.log(`is user inside lab? ${user.isInside}`)
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