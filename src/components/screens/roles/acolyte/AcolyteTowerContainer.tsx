import { View } from "react-native";
import IconButton from "../../../IconButton";
import React, { PropsWithChildren } from "react";
import ScreenContainer from "../../../ScreenContainer";
import { Images } from "../../../../helpers/constants/constants";
import { useUserStore } from "../../../../helpers/stores/useUserStore";
import { useScreenDimensions } from "../../../../helpers/stores/useScreenDimensionsStore";
import { useAcolyteInitialScreenStore } from "../../../../helpers/stores/useAcolyteInitialScreenStore";


type AcolyteScreenContainer = {
  backgroundImage?: Images,
};

export default function AcolyteTowerContainer({ backgroundImage, children }: PropsWithChildren<AcolyteScreenContainer>) {
  

  // --- SCREEN DIMENSIONS --- //
  const screenDimensions = useScreenDimensions(state => state.screenDimensions);
  if (!screenDimensions) return;

  const user = useUserStore( state => state.user);
  const setInitialScreen = useAcolyteInitialScreenStore( state => state.setAcolyteInitialScreen);

  if (!user)return null;

  return (
    <View>
      <ScreenContainer backgroundImg={backgroundImage}>
        {
          user.isInside || user.insideTower ? (null) : 
          <IconButton width={screenDimensions.width * 0.3} height={screenDimensions.height * 0.07} hasBrightness={true} backgroundImage={Images.BACK_ARROW} buttonOnPress={() => setInitialScreen(null)} xPos={20} yPos={20} hasBorder={false} backgrounOpacity={0} />
        }
        {children}
      </ScreenContainer>
    </View>
  );

};