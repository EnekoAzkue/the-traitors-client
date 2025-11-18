import React, { use, useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { Images } from "../../../../helpers/constants/constants";
import AcolyteScreenContainer from "./AcolyteScreenContainer";
import { ScrollContext, UserContext } from "../../../../helpers/contexts/contexts";
import IconButton from "../../IconButton";
import AcolyteTowerContainer from "./AcolyteTowerContainer";


function AcolyteTower() {

  const [ backgroundImage, setBackgroundImage ] = useState(Images.TOWER);
  const userContext = useContext(UserContext);

  const scrollContext = useContext(ScrollContext);

  if(!scrollContext) return;

  const [ scrollActive, setScrollActive ] = scrollContext;


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

  const setScroll = () => {
    setScrollActive(!scrollActive);
    console.log('Toggling scroll active state', scrollActive);
  }

  return (
    <AcolyteTowerContainer backgroundImage={backgroundImage} >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <IconButton
          width={40}
          height={40}
          xPos={45}
          yPos={500}
          hasBorder={false}
          backgroundImage={Images.SCROLL}
          buttonOnPress={setScroll}/>
      </View>
    </AcolyteTowerContainer>
  );
}


export default AcolyteTower;