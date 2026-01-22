import { create } from "zustand"

export interface UseGuiltyInterface {
  guiltyVotes: number

  setGuiltyVotes: (newVote: number) => void

  incrementGuiltyVotes: () => void
  resetGuiltyVotes: () => void
}

export const useGuiltyStore = create<UseGuiltyInterface>((set) => ({
  guiltyVotes: 0,

  setGuiltyVotes: (newVote: number) =>
    set({ guiltyVotes: newVote }),

  incrementGuiltyVotes: () =>
    set(state => ({ guiltyVotes: state.guiltyVotes + 1 })),

  resetGuiltyVotes: () =>
    set({ guiltyVotes: 0 }),
}))
