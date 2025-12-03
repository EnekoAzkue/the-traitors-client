import React, { PropsWithChildren, useContext } from "react";
import { Images } from "../../../../helpers/constants/constants";
import { Text, View } from "react-native";
import ScreenContainer from "../../ScreenContainer";
import IconButton from "../../IconButton";
import { AcolyteInitialScreenContext } from "../../../../helpers/contexts/contexts";
import { Dimensions } from 'react-native';
import { useUserStore } from "../../../../helpers/stores/useUserStore";

const { width, height } = Dimensions.get('window');

type AcolyteScreenContainer = {
  backgroundImage?: Images,
};

export default function AcolyteTowerContainer({ backgroundImage, children }: PropsWithChildren<AcolyteScreenContainer>) {
  // --- CONTEXTS --- //
  const user = useUserStore( state => state.user);
  const initialRouterScreen = useContext(AcolyteInitialScreenContext);

  if (!user) return (<Text>ERROR! User is null!</Text>);
  if (!initialRouterScreen) return (<Text>ERROR! Initial Router Context not got</Text>);

  const [, setInitialScreen] = initialRouterScreen;

  return (
    <View>
      <ScreenContainer backgroundImg={backgroundImage}>
        {!(user.isInside || user.insideTower) &&
          <IconButton
            width={width * 0.3}
            height={height * 0.07}
            hasBrightness={true}
            backgroundImage={Images.BACK_ARROW}
            buttonOnPress={() => setInitialScreen(null)}
            xPos={20}
            yPos={20}
            hasBorder={false}
            backgrounOpacity={0} />
        }
        {children}
      </ScreenContainer>
    </View>
  );
};