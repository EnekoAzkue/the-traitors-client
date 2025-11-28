import { create } from "zustand";

// --- INTERFACES --- //
import { MortimerInitialScreenStore } from "../interfaces/stores/mortimerInitialScreenInterfaces";

export const  useMortimerInitialScreenStore = create< MortimerInitialScreenStore >( (set) => ({
  // --- STATE --- //
  mortimerInitialScreen : 'MortimerHome', // state = {screenDimensions}

  // --- FUNCTIONS --- //
  setMortimerInitialScreen : (newScreen) =>  {
    set(() => ({mortimerInitialScreen : newScreen}))
  },
}));


