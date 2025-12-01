import React, { PropsWithChildren, useContext } from "react";
import { Images, Roles } from "../../helpers/constants/constants";
import { Text, View, Dimensions } from "react-native";
import ScreenContainer from "./ScreenContainer";
import IconButton from "./IconButton";
import { AcolyteInitialScreenContext, InventoryContext } from "../../helpers/contexts/contexts";
import KaotikaPlayer from "../../helpers/interfaces/KaotikaPlayer";

const { width, height } = Dimensions.get('window');

type AcolyteScreenContainer = {
  user: KaotikaPlayer,
  backgroundImage?: Images,
};

export default function SwampContainer({ user, backgroundImage, children }: PropsWithChildren<AcolyteScreenContainer>) {

  // --- INVENTORY CONTEXT ---
  const inventoryContext = useContext(InventoryContext);

  if (!inventoryContext) {
    return <Text>ERROR! InventoryContext Provider is missing</Text>;
  }

  const [isInventoryOpen, setIsInventoryOpen] = inventoryContext;


  // --- INITIAL SCREEN CONTEXT ---
  const initialRouterScreen = useContext(AcolyteInitialScreenContext);

  if (!initialRouterScreen) {
    return <Text>ERROR! Initial Router Context not found</Text>;
  }

  const [, setInitialScreen] = initialRouterScreen;


  // --- HANDLERS ---
  const toggleInventory = () => {
    setIsInventoryOpen(!isInventoryOpen);
  };


  return (
    <View>
      <ScreenContainer backgroundImg={backgroundImage}>

        {
          (user.rol === Roles.ACOLYTE) ? 
            <IconButton width={width * 0.3} height={height * 0.07} hasBrightness={true} backgroundImage={Images.BACK_ARROW} buttonOnPress={() => setInitialScreen(null)} xPos={width * 0.02} yPos={height * 0.02} hasBorder={false} backgrounOpacity={0} />
          : 
          <></>
        }


        {
          (user.rol === Roles.ACOLYTE || user.rol === Roles.MORTIMER) ?
            <IconButton width={height * 0.07} height={height * 0.07} hasBrightness={true} backgroundImage={Images.BAG} buttonOnPress={toggleInventory} xPos={width * 0.8} yPos={height * 0.02} hasBorder={false} backgrounOpacity={0} />
            :
            <></>
        }

        {children}
      </ScreenContainer>
    </View>
  );
}
