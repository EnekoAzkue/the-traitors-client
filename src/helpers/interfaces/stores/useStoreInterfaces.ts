import KaotikaPlayer from "../KaotikaPlayer";

export interface UserStore {
  // --- GLOBAL STATE --- //
  user: KaotikaPlayer | null,

  // --- FUNCTIONS --- //
  setUser: (newUser: KaotikaPlayer | null) => void,
};