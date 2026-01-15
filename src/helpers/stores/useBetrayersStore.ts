import { create } from "zustand";

// --- INTERFACES --- //
import { useBetrayersInterface } from "../interfaces/stores/useBetrayersInterface";

export const useBetrayersStore = create<useBetrayersInterface>((set) => ({

  // --- STATE --- //
  betrayers: [],

  // --- FUNCTIONS --- //
  setBetrayers: ((newBetrayers) => { set( () => ({betrayers: newBetrayers}) ) })
  
}));
