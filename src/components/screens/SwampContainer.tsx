import React, { PropsWithChildren, useContext } from "react";
import { Images, Roles } from "../../helpers/constants/constants";
import { Text, View, useWindowDimensions } from "react-native";
import ScreenContainer from "./ScreenContainer";
import IconButton from "./IconButton";
import { AcolyteInitialScreenContext, InventoryContext } from "../../helpers/contexts/contexts";
import KaotikaPlayer from "../../helpers/interfaces/KaotikaPlayer";
import { useCollectionStore } from "../../helpers/stores/useCollectionStore";
import { useShowRosetteStore } from "../../helpers/stores/useShowRosetteStore";


type AcolyteScreenContainer = {
  user: KaotikaPlayer,
  backgroundImage?: Images,
};

export default function SwampContainer({ user, backgroundImage, children }: PropsWithChildren<AcolyteScreenContainer>) {

  // --- INVENTORY CONTEXT ---
  const { width, height } = useWindowDimensions();
  const inventoryContext = useContext(InventoryContext);
  const initialRouterScreen = useContext(AcolyteInitialScreenContext);
  const areAllArtifactsCollected = useCollectionStore(state => state.areAllArtifactsCollected)
  const isRosetteShown = useShowRosetteStore( state => state.isRosetteShown );

  // --- INITIAL SCREEN CONTEXT ---
  if (!inventoryContext)    return <Text>ERROR! InventoryContext Provider is missing</Text>;
  if (!initialRouterScreen) return <Text>ERROR! Initial Router Context not found</Text>;
  if (!inventoryContext)    return <Text>ERROR! InventoryContext Provider is missing</Text>;

  const [isInventoryOpen, setIsInventoryOpen] = inventoryContext;
  const setInitialScreen = initialRouterScreen[1];

  // --- HANDLERS --- //
  const toggleInventory = () => {
    setIsInventoryOpen(!isInventoryOpen);
  };

  return (
    <View>
      <ScreenContainer backgroundImg={backgroundImage}>
        {
          (user.rol === Roles.ACOLYTE) ?

            (!isRosetteShown && areAllArtifactsCollected) ?
              <IconButton 
                width={width * 0.3}
                height={height * 0.07}
                hasBrightness={true}
                backgroundImage={Images.BACK_ARROW}
                buttonOnPress={() => setInitialScreen(null)}
                xPos={width * 0.02}
                yPos={height * 0.02}
                hasBorder={false}
                backgrounOpacity={0}
                shadowColor='#ffd000ff'
              />
              :
              <IconButton
                width={width * 0.3}
                height={height * 0.07}
                hasBrightness={true}
                backgroundImage={Images.BACK_ARROW}
                buttonOnPress={() => setInitialScreen(null)}
                xPos={width * 0.02}
                yPos={height * 0.02}
                hasBorder={false}
                backgrounOpacity={0}
              />

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