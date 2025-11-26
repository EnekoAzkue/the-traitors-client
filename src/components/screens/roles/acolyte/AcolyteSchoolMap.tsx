import React, { useContext, useEffect, useRef } from "react";
import { ImageBackground, Text, StyleSheet } from "react-native";
import { Images, Screens } from "../../../../helpers/constants/constants";
import IconButton from "../../../IconButton";
import { AcolyteInitialScreenContext, ScrollContext } from "../../../../helpers/contexts/contexts";
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

type InitialScreen = Screens.ACOLYTE_HOME | Screens.ACOLYTE_LAB;

export default function AcolyteSchoolMap() {
  const initialRouterScreen = useContext(AcolyteInitialScreenContext);

  if (!initialRouterScreen) return <Text>ERROR! Initial Router Context not got</Text>;

  const [initialScreen, setInitialScreen] = initialRouterScreen;

  const scrollContext = useContext(ScrollContext);

  if(!scrollContext) return;
  const [ scrollActive, setScrollActive ] = scrollContext;

  const selectInitialHomeScreen = () => setInitialScreen(Screens.ACOLYTE_HOME);
  const selectInitialLabScreen = () => {
    setInitialScreen(Screens.ACOLYTE_LAB);
    console.log("CHANGED TO LAB");
  };
  const selectInitialSettingsScreen = () => setInitialScreen(Screens.ACOLYTE_SETTINGS);
  const selectInitialHallScreen = () => setInitialScreen(Screens.ACOLYTE_HALL);


  return (
    <ImageBackground source={Images.SCHOOL_MAP} resizeMode="cover" style={styles.background}>
      <IconButton width={width*0.28} height={width*0.28} hasBrightness={true} backgroundImage={Images.MAP_ICON} buttonOnPress={() => setInitialScreen(null)} xPos={20} yPos={20} hasBorder={false} />

      {/* Botones del mapa */}
      <IconButton  width={width * 0.1} height={width * 0.1} xPos={width * 0.45} yPos={height * 0.85} hasBorder={true} backgroundImage={Images.MAIN_ICON} buttonOnPress={selectInitialHomeScreen}/>
      <IconButton width={width * 0.1} height={width * 0.1} xPos={width * 0.13} yPos={height * 0.59} hasBorder={true} backgroundImage={Images.LAB_ICON} buttonOnPress={selectInitialLabScreen}/>
      <IconButton width={width * 0.1} height={width * 0.1} xPos={width * 0.751} yPos={height * 0.59} hasBorder={true} backgroundImage={Images.SETTINGS_ICON} buttonOnPress={selectInitialSettingsScreen}/>
      {!scrollActive ? 
        <IconButton width={width * 0.1} height={width * 0.1} xPos={width * 0.751} yPos={height * 0.305} hasBorder={true} backgroundImage={Images.HALL_ICON} buttonOnPress={selectInitialHallScreen}/> : null
      }

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },
});
