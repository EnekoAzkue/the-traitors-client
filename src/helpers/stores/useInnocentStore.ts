import { create } from "zustand"

export interface UseInnocentInterface {
  innocentVotes: number
  setInnocentVotes: (newVote: number) => void
  incrementInnocentVotes: () => void
  resetInnocentVotes: () => void
}

export const useInnocentStore = create<UseInnocentInterface>((set) => ({
  // --- STATE --- //
  innocentVotes: 0,

  // --- SETTERS --- //
  setInnocentVotes: (newVote: number) =>
    set({ innocentVotes: newVote }),

  // --- ACTIONS --- //
  incrementInnocentVotes: () =>
    set(state => ({ innocentVotes: state.innocentVotes + 1 })),

  resetInnocentVotes: () =>
    set({ innocentVotes: 0 }),
}))
