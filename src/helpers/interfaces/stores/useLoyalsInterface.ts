import KaotikaPlayer from "../KaotikaPlayer";

export interface useLoyalsInterface {
  // --- GLOBAL STATE --- //
  loyals: KaotikaPlayer[],

  // --- FUNCTIONS --- //
  setLoyals: (newLoyals: KaotikaPlayer[]) => void,
};