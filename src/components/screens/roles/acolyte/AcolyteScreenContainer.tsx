
import React, { PropsWithChildren, useContext } from "react";

import { Images } from "../../../../helpers/constants/constants";
import { Text, View } from "react-native";
import ScreenContainer from "../../ScreenContainer";
import IconButton from "../../IconButton";
import { AcolyteInitialScreenContext, UserContext } from "../../../../helpers/contexts/contexts";
import styled from "styled-components/native";
import DropShadow from "react-native-drop-shadow";



type AcolyteScreenContainer = {
  backgroundImage: Images,
};

export default function AcolyteScreenContainer({ backgroundImage, children }: PropsWithChildren<AcolyteScreenContainer>) {

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
        <IconButton width={80} height={80} hasBrightness={true} backgroundImage={Images.MAP_ICON} buttonOnPress={() => setInitialScreen(null)} xPos={20} yPos={20} hasBorder={false} />
        }
        {children}
      </ScreenContainer>
    </View>
  );

};