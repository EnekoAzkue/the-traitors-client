import IconButton from "../../../IconButton";
import { useWindowDimensions } from 'react-native';
import React, { useContext, useEffect } from "react";
import { ImageBackground, Text, StyleSheet } from "react-native";
import { Images, Screens } from "../../../../helpers/constants/constants";
import { useCollectionStore } from "../../../../helpers/stores/useCollectionStore";
import { useShowRosetteStore } from "../../../../helpers/stores/useShowRosetteStore";
import { AcolyteInitialScreenContext, CollectionContext, ScrollContext } from "../../../../helpers/contexts/contexts";
import { useAcolytesCurrentNavigationTabStore } from "../../../../helpers/stores/useAcolytesCurrentNavigationTabStore";

export default function AcolyteSchoolMap() {

  // --- CONTEXTS && STORES --- //
  const { width, height } = useWindowDimensions();
  const initialRouterScreen = useContext(AcolyteInitialScreenContext);
  const scrollContext = useContext(ScrollContext);
  const collectionContext = useContext(CollectionContext);
  const isRosetteShown = useShowRosetteStore( state => state.isRosetteShown );
  const setInitialRouteScreen = useAcolytesCurrentNavigationTabStore(state => state.setAcolyteCurrentTabNavigation);

  let hallOfSagesDropShadowColor = '#ffffffff';
  
  if (!initialRouterScreen) return <Text>ERROR! Initial Router Context not got</Text>;
  if (!scrollContext) return;
  if (!collectionContext) return
  
  const setInitialScreen = initialRouterScreen[1];
  const areAllArtifactsCollected = useCollectionStore(state => state.areAllArtifactsCollected)
  
  // --- FUNCTIONS --- //
  const selectInitialHomeScreen = () => setInitialScreen(null);
  const selectInitialLabScreen = () => setInitialScreen(Screens.LAB);
  const selectInitialSettingsScreen = () => setInitialScreen(Screens.ACOLYTE_SETTINGS);
  const selectInitialHallScreen = () => setInitialScreen(Screens.HALL_OF_SAGES);
  const selectInitialDungeonScreen = () => setInitialScreen(Screens.DUNGEON);
  
  // --- EFFECTS --- //
  useEffect( () => {
    if (!isRosetteShown) hallOfSagesDropShadowColor = '#ffd000ff';
    console.log(hallOfSagesDropShadowColor);
    setInitialRouteScreen(Screens.MAP)
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
        buttonOnPress={() => setInitialScreen(Screens.MAP)}
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
        iconText="Home"

      />
      <IconButton
        width={width * 0.1}
        height={width * 0.1}
        xPos={width * 0.13}
        yPos={height * 0.59}
        hasBorder={true}
        backgroundImage={Images.LAB_ICON}
        buttonOnPress={selectInitialLabScreen}
        iconText="Lab"

      />
      { /* Si la rosetta se muestra el areAllArtifacts collected se cambia haciendo que este icono desaparezca, entonces para evitar eso, se pone el isRosetteShown */}
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
        iconText="Hall"

      />
      <IconButton
        width={width * 0.1}
        height={width * 0.1}
        xPos={width * 0.44}
        yPos={height * 0.44}
        hasBorder={true}
        backgroundImage={Images.DUNGEON_ICON}
        buttonOnPress={selectInitialDungeonScreen}
        iconText="Dungeon"

      />
    </ImageBackground>
  );
}