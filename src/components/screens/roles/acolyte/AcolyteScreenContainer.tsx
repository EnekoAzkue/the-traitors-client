import { Text, View } from "react-native";
import { Dimensions } from 'react-native';
import IconButton from "../../IconButton";
import ScreenContainer from "../../ScreenContainer";
import React, { PropsWithChildren, useContext } from "react";
import { Images } from "../../../../helpers/constants/constants";
import { useUserStore } from "../../../../helpers/stores/useUserStore";
import { AcolyteInitialScreenContext } from "../../../../helpers/contexts/contexts";

const { width, height } = Dimensions.get('window');

type AcolyteScreenContainer = {
  backgroundImage?: Images,
};

export default function AcolyteScreenContainer({ backgroundImage, children }: PropsWithChildren<AcolyteScreenContainer>) {

  // --- CONTEXTS, STORES && CONSTANTS --- //
  const initialRouterScreen = useContext(AcolyteInitialScreenContext);
  const user = useUserStore( state => state.user );

  if (!user) return (<Text>ERROR! User not found</Text>);
  if (!initialRouterScreen) return (<Text>ERROR! Initial Router Context not got</Text>);

  const setInitialScreen = initialRouterScreen[1];

  return (
    <View>
      <ScreenContainer backgroundImg={backgroundImage}>
        {!(user.isInside || user.insideTower) &&
          <IconButton
            width={width * 0.3}
            height={height * 0.07}
            hasBrightness={true}
            backgroundImage={Images.BACK_ARROW}
            buttonOnPress={() => setInitialScreen('SchoolMap')}
            xPos={20}
            yPos={20}
            hasBorder={false}
            backgrounOpacity={0}
          />}
        {children}
      </ScreenContainer>
    </View>
  );
};