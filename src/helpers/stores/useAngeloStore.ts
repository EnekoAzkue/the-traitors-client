import { create } from "zustand";

// --- INTERFACES --- //
import { AngeloStore } from "../interfaces/stores/useAngeloStore.Interfaces";

export const useAngeloStore = create<AngeloStore>((set) => ({

  // --- STATE --- //
  angelo: null,

  // --- FUNCTIONS --- //
  setAngelo: ((newAngelo) => { set( () => ({angelo: newAngelo}) ) })
  
}));
