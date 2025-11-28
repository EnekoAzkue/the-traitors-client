import KaotikaPlayer from "../KaotikaPlayer";

export interface AllAcolytesStore {
  allAcolytes: KaotikaPlayer[] | undefined,
  setAllAcolytes: (allAcolytes: KaotikaPlayer[] | undefined) =>  void
};