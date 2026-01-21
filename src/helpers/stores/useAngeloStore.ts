import { create } from "zustand";

// --- INTERFACES --- //
import { AngeloStore } from "../interfaces/stores/useAngeloStore.Interfaces";

export const useAngeloStore = create<AngeloStore>((set) => ({

  // --- STATE --- //
  isAngeloCaptured: false,

  // --- FUNCTIONS --- //
  setAngeloCaptured: ((isAngeloCaptured) => { set( () => ({isAngeloCaptured: isAngeloCaptured}) ) })
  
}));
