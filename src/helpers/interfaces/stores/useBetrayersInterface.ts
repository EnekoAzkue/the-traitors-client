import KaotikaPlayer from "../KaotikaPlayer";

export interface useBetrayersInterface {
  // --- GLOBAL STATE --- //
  betrayers: KaotikaPlayer[],

  // --- FUNCTIONS --- //
  setBetrayers: (newBetrayers: KaotikaPlayer[]) => void,
};