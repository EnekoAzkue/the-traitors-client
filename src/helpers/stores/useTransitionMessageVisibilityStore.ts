import { create } from "zustand";

interface UseTransitionMessageVisibility {
  isTransitionMessageShowing : boolean,
  setIsTransitionMessageShowing : (isTransitionMessageShowing: boolean) => void
}

export const useTransitionMessageShowingStore = create<UseTransitionMessageVisibility>((set) => ({
  // --- STATE --- //
  isTransitionMessageShowing : false, 

  // --- FUNCTIONS --- //
  setIsTransitionMessageShowing : (IsNowTransitionMessageShowing) =>  {
    set(() => ({isTransitionMessageShowing : IsNowTransitionMessageShowing}))
  },
}));