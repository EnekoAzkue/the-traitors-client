
import React, { PropsWithChildren, useContext } from "react";

import { Images } from "../../../../helpers/constants/constants";
import { Text, View } from "react-native";
import ScreenContainer from "../../ScreenContainer";
import IconButton from "../../IconButton";
import { AcolyteInitialScreenContext, UserContext } from "../../../../helpers/contexts/contexts";
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');



type AcolyteScreenContainer = {
  backgroundImage: Images,
};

export default function AcolyteTowerContainer({ backgroundImage, children }: PropsWithChildren<AcolyteScreenContainer>) {

    const userContext = useContext(UserContext);
  
    if (!userContext) {
      return null;
    }
  
    const [user] = userContext;

  const initialRouterScreen = useContext(AcolyteInitialScreenContext);

  if (!initialRouterScreen) return (<Text>ERROR! Initial Router Context not got</Text>);

  const [initialScreen, setInitialScreen] = initialRouterScreen;


  return (
    <View>
      <ScreenContainer backgroundImg={backgroundImage}>
        {user.isInside || user.insideTower ? (null) : 
        <IconButton width={width * 0.3} height={height * 0.07} hasBrightness={true} backgroundImage={Images.BACK_ARROW} buttonOnPress={() => setInitialScreen(null)} xPos={20} yPos={20} hasBorder={false} />
        }
        {children}
      </ScreenContainer>
    </View>
  );

};