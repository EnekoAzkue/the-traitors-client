import React, { use, useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { Images } from "../../../../helpers/constants/constants";
import AcolyteScreenContainer from "./AcolyteScreenContainer";
import { ScrollContext, UserContext } from "../../../../helpers/contexts/contexts";
import IconButton from "../../IconButton";
import AcolyteTowerContainer from "./AcolyteTowerContainer";
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');



function AcolyteTower() {

  const [ backgroundImage, setBackgroundImage ] = useState(Images.TOWER);
  const userContext = useContext(UserContext);

  const scrollContext = useContext(ScrollContext);

  if(!scrollContext) return;

  const [ scrollActive, setScrollActive ] = scrollContext;

  if (!userContext) return;

  const [user] = userContext;



  useEffect(() => {
    if (!userContext) return;

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
        {user.insideTower && 
        <IconButton
        width={width * 0.1}
        height={height * 0.05}
        xPos={width * 0.35}
        yPos={height * 0.9}
        hasBorder={false}
        backgroundImage={Images.SCROLL}
        buttonOnPress={setScroll}/>
        }
      </View>
    </AcolyteTowerContainer>
  );
}


export default AcolyteTower;