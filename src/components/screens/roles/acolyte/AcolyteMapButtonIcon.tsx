import React, { useContext } from "react";
import { AcolyteInitialScreenContext } from "../../../../helpers/contexts/contexts";
import { Text } from "react-native";
import { Images } from "../../../../helpers/constants/constants";
import IconButton from "../../IconButton";



export default function AcolyteMapButtonIcon() {

  const initialRouterScreen = useContext(AcolyteInitialScreenContext);

  if (!initialRouterScreen) return (<Text>ERROR! Initial Router Context not got</Text>);

  const [initialScreen, setInitialScreen] = initialRouterScreen;

    


  return (
    <>

      <IconButton width={80} height={80} backgroundImage={Images.MAP_ICON} buttonOnPress={() => setInitialScreen(null)} xPos={20} yPos={20} hasBorder={false} />

    </>
  );
}