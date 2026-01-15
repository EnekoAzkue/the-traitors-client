import KaotikaPlayer from "../KaotikaPlayer";

export interface useAcolytesInterface {
  // --- GLOBAL STATE --- //
  allAcolytes: KaotikaPlayer[],

  // --- FUNCTIONS --- //
  setAllAcolytes: (newAcolytes: KaotikaPlayer[]) => void,
};