import React, { use, useContext, useState } from "react";
import { View } from "react-native";
import { Images } from "../../../../helpers/constants/constants";
import AcolyteScreenContainer from "./AcolyteScreenContainer";
import { UserContext } from "../../../../helpers/contexts/contexts";


function AcolyteHome() {

  const [ backgroundImage, setBackgroundImage ] = useState(Images.TOWER);

  const userContext = useContext(UserContext);

  const [ user ] = userContext!;

  // TODO: Cambiar la imagen de fondo dependiendo si el RFID le permite entrar a la torre
  // if(user.insideTower) {
  //   setBackgroundImage(Images.TOWER_INSIDE);
  // } else {
  //   setBackgroundImage(Images.TOWER);
  // }

  return (
    <AcolyteScreenContainer backgroundImage={backgroundImage} >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      </View>
    </AcolyteScreenContainer>
  );
}


export default AcolyteHome;