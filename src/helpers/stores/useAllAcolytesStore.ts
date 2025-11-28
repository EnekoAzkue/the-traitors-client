import { create } from "zustand";
import { AllAcolytesStore } from "../interfaces/stores/allAcolytesStore";

export const useAllAcolytesStore = create<AllAcolytesStore>( (set) => ({
  // const [allAcolytes, setAllAcolytes] = useState<KaotikaPlayer[] | undefined>(undefined);
  allAcolytes: undefined,

  setAllAcolytes: (newAllAcolytes) =>  {
    set( () => ({allAcolytes : newAllAcolytes}) )
  }

}));
