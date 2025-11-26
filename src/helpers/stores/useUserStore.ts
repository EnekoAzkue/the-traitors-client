import { create } from "zustand";

// --- INTERFACES --- //
import { UserStore } from "../interfaces/stores/userStoreInterfaces";




export const useUserStore = create<UserStore>((set) => ({
  // --- STATE --- //
  user: null,

  // --- FUNCTIONS --- //
  setUser: ((newUser) => { set( () => ({user: newUser}) ) })
}));
