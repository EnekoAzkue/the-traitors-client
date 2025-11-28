import { Screens } from "../../../../constants/constants";


export function getAcolyteSchoolMapUtilities(setAcolyteInitialScreen: (newScreen: string | null) => void) {
  const selectInitialHomeScreen = () => setAcolyteInitialScreen(Screens.ACOLYTE_HOME);
  const selectInitialLabScreen = () => setAcolyteInitialScreen(Screens.ACOLYTE_LAB);
  const selectInitialSettingsScreen = () => setAcolyteInitialScreen(Screens.ACOLYTE_SETTINGS);
  const selectInitialHallScreen = () => setAcolyteInitialScreen(Screens.ACOLYTE_HALL);

  return { selectInitialHomeScreen, selectInitialLabScreen, selectInitialSettingsScreen, selectInitialHallScreen };
}