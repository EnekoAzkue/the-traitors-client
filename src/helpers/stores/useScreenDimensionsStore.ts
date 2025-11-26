import { create } from "zustand";

// --- Interfaces --- //
import { type ScreenDimensionsStore } from "../interfaces/stores/screenDimensionsStoreInterfaces";


export const useScreenDimensions = create<ScreenDimensionsStore>((set) => ({
  // Inicializar a null --> aun no existe el valor, cuando exista se pasará directamente a un objeto ScaledSize, 
  // mucho mejor que inicializarlo a {} ya que habría que hacer más comprobaciones a la hora de usar screenDimensions

  // --- STATE --- //
  screenDimensions : null, // state = {screenDimensions}

  // --- FUNCTIONS --- //
  setScreenDimensions : (newScreenDimensions) =>  {
    set(() => ({screenDimensions : newScreenDimensions}))
  },
}));

