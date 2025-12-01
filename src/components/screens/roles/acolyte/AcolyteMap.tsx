import React, { useContext, useEffect, useRef } from "react";
import { Animated, Image, ImageBackground, Text, StyleSheet, View } from "react-native";
import { Images, Screens } from "../../../../helpers/constants/constants";
import IconButton from "../../IconButton";
import { AcolyteInitialScreenContext } from "../../../../helpers/contexts/contexts";
import { useScreenDimensions } from "../../../../helpers/stores/useScreenDimensionsStore";
import styled from "styled-components/native";

export default function AcolyteMap() {

  // Screen Dimensions
  const screenDimensions = useScreenDimensions(state => state.screenDimensions);

  if (!screenDimensions) return; 
  
  // Current Route Screen 
  const initialRouterScreen = useContext(AcolyteInitialScreenContext);

  if (!initialRouterScreen) return <Text>ERROR! Initial Router Context not got</Text>;

  const [initialScreen, setInitialScreen] = initialRouterScreen;

  const selectInitialHomeScreen = () => setInitialScreen(Screens.SCHOOL_MAP);
  const selectInitialTowerScreen = () => setInitialScreen(Screens.ACOLYTE_TOWER);
  const selectInitialSwampScreen = () => setInitialScreen(Screens.SWAMP);

  const cloudOpacity = useRef(new Animated.Value(1)).current;
  const cloudScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(cloudOpacity, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(cloudScale, {
        toValue: 2,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);


  const StyledAcolyteMapContainer = styled.ImageBackground`
  width: ${screenDimensions.width}px;
  height: ${screenDimensions.height}px;
  `;

  return (
    <StyledAcolyteMapContainer
      source={Images.ACOLYTE_MAP}
      resizeMode="cover"
    >
      {/* Botones del mapa */}
      <IconButton
        width={screenDimensions.width * 0.1}
        height={screenDimensions.width * 0.1}
        xPos={screenDimensions.width * 0.65}
        yPos={screenDimensions.height * 0.27}
        hasBorder={true}
        backgroundImage={Images.TOWER_ICON}
        buttonOnPress={selectInitialTowerScreen}
      />
      <IconButton
        width={screenDimensions.width * 0.1}
        height={screenDimensions.width * 0.1}
        xPos={screenDimensions.width * 0.33}
        yPos={screenDimensions.height * 0.35}
        hasBorder={true}
        backgroundImage={Images.HOME_ICON}
        buttonOnPress={selectInitialHomeScreen}
      />
      <IconButton
        width={screenDimensions.width * 0.1}
        height={screenDimensions.width * 0.1}
        xPos={screenDimensions.width * 0.85}
        yPos={screenDimensions.height * 0.33}
        hasBorder={true}
        backgroundImage={Images.SWAMP_ICON}
        buttonOnPress={selectInitialSwampScreen}
      />


      {/* Capa animada de nubes */}
      <Animated.View
        style={[
          styles.cloudOverlay,
          {
            opacity: cloudOpacity,
            transform: [{ scale: cloudScale }],
          },
        ]}
        pointerEvents="none"
      >
        <Image
          source={Images.CLOUDS}
          resizeMode="cover"
          style={[styles.cloudImage]}
        />

        <View style={styles.darkFilter} />
      </Animated.View>
    </StyledAcolyteMapContainer>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  cloudOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 700,
  },
  cloudImage: {
    width: "100%",
    height: "100%",
    zIndex: 700,
  },
  darkFilter: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(10, 15, 30, 0.7)",
    zIndex: 701,
  },
});
