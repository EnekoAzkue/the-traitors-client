import React, { useContext, useEffect, useRef } from "react";
import { ImageBackground, Text, StyleSheet } from "react-native";
import { Images, Screens } from "../../../../helpers/constants/constants";
import IconButton from "../../IconButton";
import { AcolyteInitialScreenContext, ScrollContext } from "../../../../helpers/contexts/contexts";

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

  console.log("SCROLL ACTIVE IN SCHOOL MAP:", scrollActive);

  return (
    <ImageBackground
      source={Images.SCHOOL_MAP}
      resizeMode="cover"
      style={styles.background}
    >
      <IconButton width={80} height={80} hasBrightness={true} backgroundImage={Images.MAP_ICON} buttonOnPress={() => setInitialScreen(null)} xPos={20} yPos={20} hasBorder={false} />

      {/* Botones del mapa */}
      <IconButton
        width={40}
        height={40}
        xPos={185}
        yPos={700}
        hasBorder={true}
        backgroundImage={Images.MAIN_ICON}
        buttonOnPress={selectInitialHomeScreen}
      />
      <IconButton
        width={40}
        height={40}
        xPos={45}
        yPos={500}
        hasBorder={true}
        backgroundImage={Images.LAB_ICON}
        buttonOnPress={selectInitialLabScreen}
      />
      <IconButton
        width={40}
        height={40}
        xPos={315}
        yPos={500}
        hasBorder={true}
        backgroundImage={Images.SETTINGS_ICON}
        buttonOnPress={selectInitialSettingsScreen}
      />
      {!scrollActive ? 
      <IconButton
      width={40}
      height={40}
      xPos={315}
      yPos={260}
      hasBorder={true}
      backgroundImage={Images.HALL_ICON}
      buttonOnPress={selectInitialHallScreen}
      /> : null
    }

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
});
