import { create } from "zustand";

// --- INTERFACES --- //
import { GeneralModalStore } from "../interfaces/stores/generalModalStoreInterfaces";


export const useGeneralModalStore = create<GeneralModalStore>((set) => ({

  // --- STATE --- //
  modalMessage: '',

  // --- FUNCTIONS --- //
  setModalMessage: (newModalMessage) => {
    set( () => ({modalMessage: newModalMessage}) );
  },

}));