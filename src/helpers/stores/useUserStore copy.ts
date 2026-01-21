import { create } from "zustand";

// --- INTERFACES --- //
import { AngeloStore } from "../interfaces/stores/useStoreInterfaces copy";

export const useUserStore = create<AngeloStore>((set) => ({

  // --- STATE --- //
  isAngeloCaptured: false,

  // --- FUNCTIONS --- //
  setAngeloCaptured: ((isAngeloCaptured) => { set( () => ({isAngeloCaptured: isAngeloCaptured}) ) })
  
}));
