import { create } from "zustand";

// --- INTERFACES --- //
import { useAcolytesInterface } from "../interfaces/stores/useAcolytesInterface";

export const useAcolytesStore = create<useAcolytesInterface>((set) => ({

  // --- STATE --- //
  allAcolytes: [],

  // --- FUNCTIONS --- //
  setAllAcolytes: ((newAcolytes) => { set( () => ({allAcolytes: newAcolytes}) ) })
  
}));
