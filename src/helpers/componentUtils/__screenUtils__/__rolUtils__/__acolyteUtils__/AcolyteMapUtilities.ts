import { Animated } from "react-native";
import { Screens } from "../../../../constants/constants";


export function getAcolyteMapScreenUtilities(setAcolyteInitialScreen: (newScreen: string | null) => void) {

  const selectInitialHomeScreen = () => setAcolyteInitialScreen(Screens.SCHOOL_MAP);
  const selectInitialTowerScreen = () => setAcolyteInitialScreen(Screens.ACOLYTE_TOWER);
  const selectInitialSwampScreen = () => setAcolyteInitialScreen(Screens.ACOLYTE_SWAMP);


  function generateCloudAnimation({ cloudOpacity, cloudScale }: any) {
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
  }

  return { selectInitialHomeScreen, selectInitialTowerScreen, selectInitialSwampScreen, generateCloudAnimation };

}