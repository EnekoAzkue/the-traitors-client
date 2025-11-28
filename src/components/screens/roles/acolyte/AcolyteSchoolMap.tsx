import React from "react";
import IconButton from "../../../IconButton";
import { Images, Screens } from "../../../../helpers/constants/constants";
import { useScrollStore } from "../../../../helpers/stores/useScrollStore";
import { useScreenDimensions } from "../../../../helpers/stores/useScreenDimensionsStore";
import { useAcolyteInitialScreenStore } from "../../../../helpers/stores/useAcolyteInitialScreenStore";
import { getAcolyteSchoolMapUtilities } from "../../../../helpers/componentUtils/__screenUtils__/__rolUtils__/__acolyteUtils__/AcolyteSchoolMapUtilities";
import { getAcolyteSchoolMapStyledComponents } from "../../../../componentStyles/screensStyles/roles/acolyte/AcolyteSchoolMapStyles";

export default function AcolyteSchoolMap() {

  // --- SCREEN DIMENSIONS --- //
  const screenDimensions = useScreenDimensions(state => state.screenDimensions);
  if (!screenDimensions) return;

  const setAcolyteInitialScreen = useAcolyteInitialScreenStore(state => state.setAcolyteInitialScreen);

  const scrollActive = useScrollStore( state => state.scrollActive);

  const { 
    selectInitialHomeScreen, 
    selectInitialLabScreen,
    selectInitialSettingsScreen, 
    selectInitialHallScreen } = getAcolyteSchoolMapUtilities(setAcolyteInitialScreen);

  // --- STYLED COMPONENTS --- //
  const {StyledAcolyteSchoolMapImageBackground} = getAcolyteSchoolMapStyledComponents(screenDimensions);

  const { width, height} = screenDimensions;
  return (
    <StyledAcolyteSchoolMapImageBackground source={Images.SCHOOL_MAP} resizeMode="cover">
      <IconButton width={width*0.28} height={width*0.28} hasBrightness={true} backgroundImage={Images.MAP_ICON} buttonOnPress={() => setAcolyteInitialScreen(null)} xPos={20} yPos={20} hasBorder={false} />

      {/* Botones del mapa */}
      <IconButton  width={width * 0.1} height={width * 0.1} xPos={width * 0.45} yPos={height * 0.85} hasBorder={true} backgroundImage={Images.MAIN_ICON} buttonOnPress={selectInitialHomeScreen}/>
      <IconButton width={width * 0.1} height={width * 0.1} xPos={width * 0.13} yPos={height * 0.59} hasBorder={true} backgroundImage={Images.LAB_ICON} buttonOnPress={selectInitialLabScreen}/>
      <IconButton width={width * 0.1} height={width * 0.1} xPos={width * 0.751} yPos={height * 0.59} hasBorder={true} backgroundImage={Images.SETTINGS_ICON} buttonOnPress={selectInitialSettingsScreen}/>
      {!scrollActive ? <IconButton width={width * 0.1} height={width * 0.1} xPos={width * 0.751} yPos={height * 0.305} hasBorder={true} backgroundImage={Images.HALL_ICON} buttonOnPress={selectInitialHallScreen}/> : null }

    </StyledAcolyteSchoolMapImageBackground>
  );
}

