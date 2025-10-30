import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { Images } from "../../../../helpers/constants/constants";
import ScreenContainer from "../../ScreenContainer";
import QRCodeContainer from "../../QR";
import { UserContext } from "../../../../helpers/contexts/contexts";

function AcolyteLab() {
  const userContext = useContext(UserContext);
  const [backgroundImg, setBackgroundImg] = useState(Images.ACOLYTE_LAB);
  const [accesedIn, setAccesedIn] = useState<boolean>(false);

  useEffect(() => {
    if (!userContext) return;
    
    const [user] = userContext;
    console.log('in use effect')

    if (user.isInside && !accesedIn) {
      console.log(`is user inside lab? ${user.isInside}`)
      setBackgroundImg(Images.ACOLYTE_LAB_OPEN);
      console.log(`background to ${backgroundImg}`)
      setTimeout(() => {
        console.log(`background to ${backgroundImg}`)
        setBackgroundImg(Images.ACOLYTE_LAB_INSIDE);
      }, 1200); 
      setAccesedIn(true);
      return;
    } else {
      console.log(`is user inside lab? ${user.isInside}`)
      setBackgroundImg(Images.ACOLYTE_LAB);
    }
  }, [userContext]);

  return (
    <ScreenContainer backgroundImg={backgroundImg}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <QRCodeContainer />
      </View>
    </ScreenContainer>
  );
}

export default AcolyteLab;