import { create } from "zustand";

// --- INTERFACES --- //
import { Screens } from "../constants/constants";

interface AcolyteCurrentTabNavigationInterface {
  acolyteCurrentTabNavigation: string,
  setAcolyteCurrentTabNavigation: ((newCurrentTab: string) => void),
}

export const useAcolytesCurrentNavigationTabStore = create<AcolyteCurrentTabNavigationInterface>((set) => ({

  // --- STATE --- //
  acolyteCurrentTabNavigation: Screens.MAP,

  // --- FUNCTIONS --- //
  setAcolyteCurrentTabNavigation: ((newCurrentTab) => { set( () => ({acolyteCurrentTabNavigation: newCurrentTab}) ) })
  
}));
