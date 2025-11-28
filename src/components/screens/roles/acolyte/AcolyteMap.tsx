import IconButton from "../../../IconButton";
import React, { useEffect, useRef } from "react";
import { Animated, Image, View } from "react-native";
import { Images } from "../../../../helpers/constants/constants";
import { useScreenDimensions } from "../../../../helpers/stores/useScreenDimensionsStore";
import { useAcolyteInitialScreenStore } from "../../../../helpers/stores/useAcolyteInitialScreenStore";
import { acolyteMapStyles, getAcolyteMapScreenStyledComponents } from "../../../../componentStyles/screensStyles/roles/acolyte/AcolyteMapStyles";
import { getAcolyteMapScreenUtilities } from "../../../../helpers/componentUtils/__screenUtils__/__rolUtils__/__acolyteUtils__/AcolyteMapUtilities";

export default function AcolyteMap() {

  // --- SCREEN DIMENSIONS --- //
  const screenDimensions = useScreenDimensions(state => state.screenDimensions);
    if (!screenDimensions) return; 
  const { width, height } = screenDimensions;
  
  // --- CURRENT ROUTE SCREEN --- //
  const setAcolyteInitialScreen = useAcolyteInitialScreenStore( state => state.setAcolyteInitialScreen);

  // --- CLOUD ANIMATION PROPERTIES --- //
  const cloudOpacity = useRef(new Animated.Value(1)).current;
  const cloudScale = useRef(new Animated.Value(1)).current;

    // --- ANIMATION TRACKER --- //
  const hasAnimationStarted = useRef(false);


  // --- UTILITIES --- //
  const acolyteMapScreenUtilities = getAcolyteMapScreenUtilities(setAcolyteInitialScreen);

  // --- STYLED COMPONENTS --- //
  const {StyledAcolyteMapContainer} = getAcolyteMapScreenStyledComponents(screenDimensions);

  useEffect(() => {
    if (!hasAnimationStarted.current) {
      hasAnimationStarted.current = true;
      acolyteMapScreenUtilities.generateCloudAnimation({cloudOpacity, cloudScale})
    }
  }, []);

  return (
    <StyledAcolyteMapContainer source={Images.ACOLYTE_MAP} resizeMode="cover">
      {/* Botones del mapa */}
      <IconButton width={width * 0.1} height={width * 0.1} xPos={width * 0.65} yPos={height * 0.27} hasBorder={true} backgroundImage={Images.TOWER_ICON} buttonOnPress={acolyteMapScreenUtilities.selectInitialTowerScreen} />
      <IconButton width={width * 0.1} height={width * 0.1} xPos={width * 0.33} yPos={height * 0.35} hasBorder={true} backgroundImage={Images.HOME_ICON} buttonOnPress={acolyteMapScreenUtilities.selectInitialHomeScreen} />
      <IconButton width={width * 0.1} height={width * 0.1} xPos={width * 0.85} yPos={height * 0.33} hasBorder={true} backgroundImage={Images.SWAMP_ICON} buttonOnPress={acolyteMapScreenUtilities.selectInitialSwampScreen} />


      {/* Capa animada de nubes */}
      <Animated.View
        style={[
          acolyteMapStyles.cloudOverlay,
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
          style={[acolyteMapStyles.cloudImage]} 
        />

        <View style={acolyteMapStyles.darkFilter} />
      </Animated.View>
    </StyledAcolyteMapContainer>
  );
}

