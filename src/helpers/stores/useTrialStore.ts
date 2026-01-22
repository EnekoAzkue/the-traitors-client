import { create } from "zustand";

// --- INTERFACES --- //
import { trialStoreInterface } from "../interfaces/stores/trialStoreInterface";

export const useTrialStore = create<trialStoreInterface>((set) => ({

  // --- STATE --- //
  isTrialActive: false,

  // --- FUNCTIONS --- //
  setTrialActive: ((trial) => { set( () => ({isTrialActive: trial}) ) })
  
}));
