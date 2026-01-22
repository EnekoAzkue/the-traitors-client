export interface trialStoreInterface {
  // --- GLOBAL STATE --- //
  isTrialActive: boolean,

  // --- FUNCTIONS --- //
  setTrialActive: (isTrialActive: boolean) => void,
};