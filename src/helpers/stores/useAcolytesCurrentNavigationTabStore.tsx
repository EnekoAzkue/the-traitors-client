import { create } from "zustand";

// --- INTERFACES --- //
import { activatedArtifactStore } from "../interfaces/stores/activatedArtifactStoreInterface";
import { Screens } from "../constants/constants";

interface AcolyteCurrentTabNavigationInterface {
  acolyteCurrentTabNavigation: string,
  setAcolyteCurrentTabNavigation: ((newCurrentTab: string) => void),
}

export const useAcolytesCurrentNavigationTabStore = create<AcolyteCurrentTabNavigationInterface>((set) => ({

  // --- STATE --- //
  acolyteCurrentTabNavigation: Screens.ACOLYTE_MAP,

  // --- FUNCTIONS --- //
  setAcolyteCurrentTabNavigation: ((newCurrentTab) => { set( () => ({acolyteCurrentTabNavigation: newCurrentTab}) ) })
  
}));
