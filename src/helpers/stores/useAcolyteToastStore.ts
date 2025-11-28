import { create } from "zustand";

// --- INTERFACES--- // 
import { type AcolyteToastStore } from "../interfaces/stores/acolyteToastInterfaces";


export const  useAcolyteToastStore = create< AcolyteToastStore >( (set) => ({
  // --- STATE --- //
  acolyteToastText: '', // state = {acolyteToastText}

  // --- FUNCTIONS --- //
  setAcolyteToastText : (newToastText) =>  {
    set(() => ({acolyteToastText : newToastText}))
  },
}));

// export const AcolyteToastTextContext = createContext<[string, (newToastText: string ) => void] | null>(null);
// const [acolyteToastText, setAcolyteToastText] = useState<string>('');