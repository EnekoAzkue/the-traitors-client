import { create } from "zustand";

// --- INTERFACES --- //
import { UseInnocentInterface } from "../interfaces/stores/useInnocentInterface";

export const useInnocentStore = create<UseInnocentInterface>((set) => ({

  // --- STATE --- //
  innocentVotes: 0,

  // --- FUNCTIONS --- //
  setInnocentVotes: ((newVote) => { set( () => ({innocentVotes: newVote}) ) })
  
}));
