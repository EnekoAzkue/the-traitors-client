import React, { useContext } from "react";
import { Dimensions } from 'react-native';
import IconButton from "../../IconButton";
import { ImageBackground, Text, StyleSheet } from "react-native";
import { Images, Screens } from "../../../../helpers/constants/constants";
import { AcolyteInitialScreenContext, CollectionContext, ScrollContext } from "../../../../helpers/contexts/contexts";
import { useCollectionStore } from "../../../../helpers/stores/useCollectionStore";

const { width, height } = Dimensions.get('window');

export default function AcolyteSchoolMap() {
  // --- CONTEXTS --- //
  const initialRouterScreen = useContext(AcolyteInitialScreenContext);
  const scrollContext = useContext(ScrollContext);
  const collectionContext = useContext(CollectionContext)

  if (!initialRouterScreen) return <Text>ERROR! Initial Router Context not got</Text>;
  if (!scrollContext) return;
  if (!collectionContext) return

  const [, setInitialScreen] = initialRouterScreen;
  const areAllArtifactsCollected = useCollectionStore(state => state.areAllArtifactsCollected)

  // --- FUNCTIONS --- //
  const selectInitialHomeScreen = () => setInitialScreen(Screens.ACOLYTE_HOME);
  const selectInitialLabScreen = () => setInitialScreen(Screens.ACOLYTE_LAB);
  const selectInitialSettingsScreen = () => setInitialScreen(Screens.ACOLYTE_SETTINGS);
  const selectInitialHallScreen = () => setInitialScreen(Screens.HALL_OF_SAGES);

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
      {areAllArtifactsCollected &&
      <IconButton
        width={width * 0.1}
        height={width * 0.1}
        xPos={width * 0.751}
        yPos={height * 0.305}
        hasBorder={true}
        backgroundImage={Images.HALL_ICON}
        buttonOnPress={selectInitialHallScreen}
        hasBrightness={true}
        shadowColor='#ffd000ff'
      /> 
}
    </ImageBackground>
  );
}