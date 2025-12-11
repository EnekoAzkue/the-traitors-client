import { create } from "zustand";
import { UseShowRosette } from "../interfaces/stores/useShowRosetteStoreInterface";

export const useShowRosetteStore = create<UseShowRosette>((set) => ({
  // --- STATE --- //
  isRosetteShown : false, // state = {isRosetteShown}

  // --- FUNCTIONS --- //
  setIsRosetteShown : (newIsRosetteShown) =>  {
    set(() => ({isRosetteShown : newIsRosetteShown}))
  },
}));