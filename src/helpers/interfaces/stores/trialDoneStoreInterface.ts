export interface trialDoneStoreInterface {
  // --- GLOBAL STATE --- //
  isTrialDone: boolean,

  // --- FUNCTIONS --- //
  setTrialDone: (isTrialDone: boolean) => void,
};