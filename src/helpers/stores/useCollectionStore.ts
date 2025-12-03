import { create } from "zustand";

// --- INTERFACES --- //
import { CollectionStore } from "../interfaces/stores/collectionStoreInterface";

export const useCollectionStore = create<CollectionStore>((set) => ({

  // --- STATE --- //
  areAllArtifactsCollected: false,

  // --- FUNCTIONS --- //
  setAreAllArtifactsCollected: ((collected) => { set( () => ({areAllArtifactsCollected: collected}) ) })
  
}));
