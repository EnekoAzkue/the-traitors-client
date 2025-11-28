import { create } from "zustand";

// --- INTERFACES --- //
import { type ScrollStore } from "../interfaces/stores/scrollActiveInterfaces";


export const useScrollStore = create<ScrollStore>((set) => ({
  // --- STATE --- //
  scrollActive: true,  // state : {scrollActive}

  // --- FUNCTIONS --- //
  setScrollActive : ((value) => {
    set( () => ({scrollActive: value}))
  }) 

}));