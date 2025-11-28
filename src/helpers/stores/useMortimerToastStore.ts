import { create } from "zustand";

// --- INTERFACES --- // 
import { MortimerToastStore } from "../interfaces/stores/mortimerToastInterfaces";

export const  useMortimerToastStore = create< MortimerToastStore >( (set) => ({
  // --- STATE --- //
  mortimerToastText : '', // state = {screenDimensions}

  // --- FUNCTIONS --- //
  setMortimerToastText : (newToastText) =>  {
    set(() => ({mortimerToastText : newToastText}))
  },
}));

