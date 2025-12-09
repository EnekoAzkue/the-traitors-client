import { create } from "zustand";

// --- INTERFACES --- //
import { activatedArtifactStore } from "../interfaces/stores/activatedArtifactStoreInterface";


export const useActivatedArtifactStore = create<activatedArtifactStore>((set) => ({

  // --- STATE --- //
  activatedArtifacts: [],

  // --- FUNCTIONS --- //
  setActivatedArtifacts: ((newArtifacts) => { set( () => ({activatedArtifacts: newArtifacts}) ) })
  
}));
