import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { Images,  } from "../../../../helpers/constants/constants";
import QRCodeContainer from "../../QR";
import { UserContext } from "../../../../helpers/contexts/contexts";
import AcolyteScreenContainer from "./AcolyteScreenContainer";

function AcolyteLab() {
  const userContext = useContext(UserContext);
  const [backgroundImg, setBackgroundImg] = useState(Images.ACOLYTE_LAB);
  const [accesedIn, setAccesedIn] = useState<boolean>(false);

  useEffect(() => {
    if (!userContext) return;

    const [user] = userContext;
    console.log('in use effect');

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