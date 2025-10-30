import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { Images } from "../../../../helpers/constants/constants";
import ScreenContainer from "../../ScreenContainer";
import QRCodeContainer from "../../QR";
import { UserContext } from "../../../../helpers/contexts/contexts";

function AcolyteLab() {
  const userContext = useContext(UserContext);
  const [backgroundImg, setBackgroundImg] = useState(Images.ACOLYTE_LAB);

  useEffect(() => {
    if (!userContext) return;

    const [user] = userContext;

    if (user.isInside) {
      setBackgroundImg(Images.ACOLYTE_LAB_OPEN);

      const changeToInside = setTimeout(() => {
        setBackgroundImg(Images.ACOLYTE_LAB_INSIDE);
      }, 1200); 
      return clearTimeout(changeToInside);
    } else {
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