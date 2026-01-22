export interface UseInnocentInterface {
  // --- GLOBAL STATE --- //
  innocentVotes: number,

  // --- FUNCTIONS --- //
  setInnocentVotes: (newVote: number) => void,
};