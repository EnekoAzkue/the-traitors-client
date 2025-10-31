import React, { useContext } from "react";
import { ImageBackground, Text } from "react-native";
import { Images, Screens } from "../../../../helpers/constants/constants";
import IconButton from "../../IconButton";
import { AcolyteInitialScreenContext } from "../../../../helpers/contexts/contexts";


type InitialScreen = Screens.ACOLYTE_HOME | Screens.ACOLYTE_LAB ; 



export default function AcolyteMap() {

    const initialRouterScreen = useContext(AcolyteInitialScreenContext);
  
    if (!initialRouterScreen) return (<Text>ERROR! Initial Router Context not got</Text>);
  
    const [initialScreen, setInitialScreen] = initialRouterScreen;

    const selectInitialHomeScreen =  () => {
      setInitialScreen(Screens.ACOLYTE_HOME);
    };

    const selectInitialLabScreen =  () => {
      setInitialScreen(Screens.ACOLYTE_LAB);
    };


  return (
    <ImageBackground source={Images.ACOLYTE_MAP} resizeMode="cover" style={{ width: "100%", height: "100%", alignItems: "center" }}>
      <IconButton width={40} height={40} xPos={130} yPos={290} backgroundImage={Images.HOME_ICON} buttonOnPress={selectInitialHomeScreen} />
      <IconButton width={40} height={40} xPos={160} yPos={480} backgroundImage={Images.LAB_ICON} buttonOnPress={selectInitialLabScreen} />
      <IconButton width={40} height={40} xPos={270} yPos={220} backgroundImage={Images.TOWER_ICON} buttonOnPress={() => {}} />
    </ImageBackground>
  );
}