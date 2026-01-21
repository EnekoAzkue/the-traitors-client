import NpcInterface from "../Npc";

export interface AngeloStore {
  // --- GLOBAL STATE --- //
  angelo: NpcInterface | null,

  // --- FUNCTIONS --- //
  setAngelo: (angelo: NpcInterface) => void,
};