import IconButton from "../../IconButton";
import { useWindowDimensions } from 'react-native';
import React, { useContext, useEffect } from "react";
import { ImageBackground, Text, StyleSheet } from "react-native";
import { Images, Screens } from "../../../../helpers/constants/constants";
import { useCollectionStore } from "../../../../helpers/stores/useCollectionStore";
import { useShowRosetteStore } from "../../../../helpers/stores/useShowRosetteStore";
import { AcolyteInitialScreenContext, CollectionContext, ScrollContext } from "../../../../helpers/contexts/contexts";

export default function AcolyteSchoolMap() {

  // --- CONTEXTS && STORES --- //
  const { width, height } = useWindowDimensions();
  const initialRouterScreen = useContext(AcolyteInitialScreenContext);
  const scrollContext = useContext(ScrollContext);
  const collectionContext = useContext(CollectionContext);
  const isRosetteShown = useShowRosetteStore( state => state.isRosetteShown );
  let hallOfSagesDropShadowColor = '#ffffffff';
  
  if (!initialRouterScreen) return <Text>ERROR! Initial Router Context not got</Text>;
  if (!scrollContext) return;
  if (!collectionContext) return
  
  const setInitialScreen = initialRouterScreen[1];
  const areAllArtifactsCollected = useCollectionStore(state => state.areAllArtifactsCollected)
  
  // --- FUNCTIONS --- //
  const selectInitialHomeScreen = () => setInitialScreen(Screens.ACOLYTE_HOME);
  const selectInitialLabScreen = () => setInitialScreen(Screens.ACOLYTE_LAB);
  const selectInitialSettingsScreen = () => setInitialScreen(Screens.ACOLYTE_SETTINGS);
  const selectInitialHallScreen = () => setInitialScreen(Screens.HALL_OF_SAGES);

  // --- EFFECTS --- //
  useEffect( () => {
    if (!isRosetteShown) hallOfSagesDropShadowColor = '#ffd000ff';
    console.log(hallOfSagesDropShadowColor);
  }, [] );

  // --- STYLES --- //
  const styles = StyleSheet.create({
    background: {
      width: "100%",
      height: "100%",
      alignItems: "center",
    },
  });
  return (
    <ImageBackground
      source={Images.SCHOOL_MAP}
      resizeMode="cover"
      style={styles.background}
    >
      <IconButton
        width={80}
        height={80}
        hasBrightness={true}
        backgroundImage={Images.MAP_ICON}
        buttonOnPress={() => setInitialScreen(null)}
        xPos={20}
        yPos={20}
        hasBorder={false}
      />
      <IconButton
        width={width * 0.1}
        height={width * 0.1}
        xPos={width * 0.45}
        yPos={height * 0.85}
        hasBorder={true}
        backgroundImage={Images.MAIN_ICON}
        buttonOnPress={selectInitialHomeScreen}
      />
      <IconButton
        width={width * 0.1}
        height={width * 0.1}
        xPos={width * 0.13}
        yPos={height * 0.59}
        hasBorder={true}
        backgroundImage={Images.LAB_ICON}
        buttonOnPress={selectInitialLabScreen}
      />
      <IconButton
        width={width * 0.1}
        height={width * 0.1}
        xPos={width * 0.751}
        yPos={height * 0.59}
        hasBorder={true}
        backgroundImage={Images.SETTINGS_ICON}
        buttonOnPress={selectInitialSettingsScreen}
      />
      { /* Si la rosetta se muestra el areAllArtifacts collected se cambia haciendo que este icono desaparezca, entonces para evitar eso, se pone el isRosetteShown */}
      { (isRosetteShown || areAllArtifactsCollected) &&
      <IconButton
        width={width * 0.1}
        height={width * 0.1}
        xPos={width * 0.751}
        yPos={height * 0.305}
        hasBorder={true}
        backgroundImage={Images.HALL_ICON}
        buttonOnPress={selectInitialHallScreen}
        hasBrightness={true}
        shadowColor={hallOfSagesDropShadowColor}
      /> 
    }
    </ImageBackground>
  );
}