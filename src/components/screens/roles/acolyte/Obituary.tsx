import React, { useContext } from "react";
import { Text, useWindowDimensions } from "react-native";
import ScreenContainer from "../../ScreenContainer";
import { Images } from "../../../../helpers/constants/constants";
import IconButton from "../../IconButton";
import { AcolyteInitialScreenContext } from "../../../../helpers/contexts/contexts";
import Rosette from "../../../Rosette";

export default function Obituary() {

  // --- CONSTANTS, CONTEXTS && STORES --- //
  const { width, height } = useWindowDimensions();
  const initialRouterScreen = useContext(AcolyteInitialScreenContext);
  
  if (!initialRouterScreen) return (<Text>ERROR! Initial Router Context not got</Text>);

  const setInitialScreen = initialRouterScreen[1];

  // --- EFFECTS--- //

  return (
    <>
      <ScreenContainer backgroundImg={Images.OBITUARY}>
        {/* TODO: Modularizar este componente para crear un Obituary screen container que almacene este iconButton */}
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
      </ScreenContainer>
    </>
  );
}