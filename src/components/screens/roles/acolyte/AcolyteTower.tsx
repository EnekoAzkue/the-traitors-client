import React, { use, useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { Images } from "../../../../helpers/constants/constants";
import AcolyteScreenContainer from "./AcolyteScreenContainer";
import { UserContext } from "../../../../helpers/contexts/contexts";


function AcolyteTower() {

  const [ backgroundImage, setBackgroundImage ] = useState(Images.TOWER);
  const userContext = useContext(UserContext);


  useEffect(() => {
    if (!userContext) return;

    const [user] = userContext;
    console.log(`Inside tower? ${user.insideTower}`)
    if(user.insideTower) {
      setBackgroundImage(Images.TOWER_INSIDE);
    } else {
      setBackgroundImage(Images.TOWER);
    }
  })

  return (
    <AcolyteScreenContainer backgroundImage={backgroundImage} >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      </View>
    </AcolyteScreenContainer>
  );
}


export default AcolyteTower;