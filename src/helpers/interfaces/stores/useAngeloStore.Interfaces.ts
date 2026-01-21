export interface AngeloStore {
  // --- GLOBAL STATE --- //
  isAngeloCaptured: boolean,

  // --- FUNCTIONS --- //
  setAngeloCaptured: (isAngeloCaptured: boolean) => void,
};