
import React, { PropsWithChildren, useContext, useEffect, useState } from "react";

import { Images } from "../../../../helpers/constants/constants";
import { Text, View } from "react-native";
import ScreenContainer from "../../ScreenContainer";
import IconButton from "../../IconButton";
import { AcolyteInitialScreenContext, InventoryContext, UserContext } from "../../../../helpers/contexts/contexts";
import { Dimensions } from 'react-native';
import Button from "../../../Button";

const { width, height } = Dimensions.get('window');



type AcolyteScreenContainer = {
  backgroundImage?: Images,
};

export default function AcolyteSwampContainer({ backgroundImage, children }: PropsWithChildren<AcolyteScreenContainer>) {

    const inventoryContext = useContext(InventoryContext);

    
    const [isInventoryOpen, setIsInventoryOpen] = inventoryContext
    const initialRouterScreen = useContext(AcolyteInitialScreenContext);

  if (!initialRouterScreen) return (<Text>ERROR! Initial Router Context not got</Text>);

  const [initialScreen, setInitialScreen] = initialRouterScreen;

  const toggleInventory = () => {
    setIsInventoryOpen(!isInventoryOpen)
    console.log('Inventoy open?', isInventoryOpen)
  }

  return (
    <View>
      <ScreenContainer backgroundImg={backgroundImage}>
        {/*TODO: refactor dimensions for iconbuttons*/}
        <IconButton width={width * 0.3} height={height * 0.07} hasBrightness={true} backgroundImage={Images.BACK_ARROW} buttonOnPress={() => setInitialScreen(null)} xPos={width * 0.02} yPos={height * 0.02} hasBorder={false}   backgrounOpacity={0} />
        <IconButton width={height * 0.07} height={height * 0.07} hasBrightness={true} backgroundImage={Images.BAG} buttonOnPress={toggleInventory} xPos={width * 0.8} yPos={height * 0.02} hasBorder={false}   backgrounOpacity={0} />
        {children}
      </ScreenContainer>
    </View>
  );

};