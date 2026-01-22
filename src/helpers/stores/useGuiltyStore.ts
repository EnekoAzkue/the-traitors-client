import { create } from "zustand";

// --- INTERFACES --- //
import { UseGuiltyInterface } from "../interfaces/stores/useGuiltyInterface";

export const useGuiltyStore = create<UseGuiltyInterface>((set) => ({

  // --- STATE --- //
  guiltyVotes: 0,

  // --- FUNCTIONS --- //
  setGuiltyVotes: ((newVote) => { set( () => ({guiltyVotes: newVote}) ) })
  
}));
