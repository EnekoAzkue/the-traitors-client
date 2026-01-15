import { create } from "zustand";

// --- INTERFACES --- //
import { useLoyalsInterface } from "../interfaces/stores/useLoyalsInterface";

export const useLoyalsStore = create<useLoyalsInterface>((set) => ({

  // --- STATE --- //
  loyals: [],

  // --- FUNCTIONS --- //
  setLoyals: ((newLoyals) => { set( () => ({loyals: newLoyals}) ) })
  
}));
