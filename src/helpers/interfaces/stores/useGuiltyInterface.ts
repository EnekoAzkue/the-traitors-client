export interface UseGuiltyInterface {
  // --- GLOBAL STATE --- //
  guiltyVotes: number,

  // --- FUNCTIONS --- //
  setGuiltyVotes: (newVote: number) => void,
};