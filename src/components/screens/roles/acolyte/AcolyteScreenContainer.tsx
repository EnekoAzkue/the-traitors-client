
import React, { PropsWithChildren, useContext } from "react";
import IconButton from "../../../IconButton";
import ScreenContainer from "../../../ScreenContainer";
import { Images } from "../../../../helpers/constants/constants";
import { View } from "react-native";
import { AcolyteInitialScreenContext } from "../../../../helpers/contexts/contexts";
import { Dimensions } from 'react-native';
import { useUserStore } from "../../../../helpers/stores/useUserStore";

const { width, height } = Dimensions.get('window');



type AcolyteScreenContainer = {
  backgroundImage?: Images,
};

export default function AcolyteScreenContainer({ backgroundImage, children }: PropsWithChildren<AcolyteScreenContainer>) {

  const {user} = useUserStore(); 
  if (!user) return;
  
  const initialRouterScreen = useContext(AcolyteInitialScreenContext);
  if (!initialRouterScreen) return;

  const [initialScreen, setInitialScreen] = initialRouterScreen;


  return (
    <View>
      <ScreenContainer backgroundImg={backgroundImage}>
        {user.isInside || user.insideTower ? (null) : 
        <IconButton width={width * 0.3} height={height * 0.07} hasBrightness={true} backgroundImage={Images.BACK_ARROW} buttonOnPress={() => setInitialScreen('SchoolMap')} xPos={20} yPos={20} hasBorder={false} backgrounOpacity={0}/>
        }
        {children}
      </ScreenContainer>
    </View>
  );

};