
import React, { PropsWithChildren } from "react";
import IconButton from "../../../IconButton";
import ScreenContainer from "../../../ScreenContainer";
import { Images } from "../../../../helpers/constants/constants";
import { View } from "react-native";
import { Dimensions } from 'react-native';
import { useUserStore } from "../../../../helpers/stores/useUserStore";
import { useAcolyteInitialScreenStore } from "../../../../helpers/stores/useAcolyteInitialScreenStore";

const { width, height } = Dimensions.get('window');



type AcolyteScreenContainer = {
  backgroundImage?: Images,
};

export default function AcolyteScreenContainer({ backgroundImage, children }: PropsWithChildren<AcolyteScreenContainer>) {

  const {user} = useUserStore(); 
  if (!user) return;

  const setAcolyteInitialScreen = useAcolyteInitialScreenStore( state => state.setAcolyteInitialScreen);


  return (
    <View>
      <ScreenContainer backgroundImg={backgroundImage}>
        {user.isInside || user.insideTower ? (null) : 
        <IconButton width={width * 0.3} height={height * 0.07} hasBrightness={true} backgroundImage={Images.BACK_ARROW} buttonOnPress={() => setAcolyteInitialScreen('SchoolMap')} xPos={20} yPos={20} hasBorder={false} backgrounOpacity={0}/>
        }
        {children}
      </ScreenContainer>
    </View>
  );

};