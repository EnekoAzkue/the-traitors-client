import { create } from "zustand";

// --- INTERFACES --- //
import { trialDoneStoreInterface } from "../interfaces/stores/trialDoneStoreInterface";

export const useTrialDoneStore = create<trialDoneStoreInterface>((set) => ({

  // --- STATE --- //
  isTrialDone: false,

  // --- FUNCTIONS --- //
  setTrialDone: ((trial) => { set( () => ({isTrialDone: trial}) ) })
  
}));
