import { create } from "zustand";


export interface AcolyteInitialScreenStore {
  acolyteInitialScreen: string | null, 
  setAcolyteInitialScreen : (newScreen: string | null) => void,
};

export const useAcolyteInitialScreenStore = create<AcolyteInitialScreenStore>((set) => ({
  acolyteInitialScreen: null, 
  setAcolyteInitialScreen : (newScreen) => {
    set( () => ({acolyteInitialScreen : newScreen}) )
  },
}));

// const [acolyteInitialScreen, setAcolyteInitialScreen] = useState<string | null>(null);
// export const AcolyteInitialScreenContext = createContext<[string | null, (newScreen: string | null) => void] | null>(null);
