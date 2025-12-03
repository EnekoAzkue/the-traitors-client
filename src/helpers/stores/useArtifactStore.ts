import { create } from "zustand";

// --- INTERFACES --- //
import { ArtifactStore } from "../interfaces/stores/artifactStoreInterface";


export const useArtifactsStore = create<ArtifactStore>((set) => ({

  // --- STATE --- //
  artifacts: [],

  // --- FUNCTIONS --- //
  setArtifacts: ((newArtifacts) => { set( () => ({artifacts: newArtifacts}) ) })
  
}));
