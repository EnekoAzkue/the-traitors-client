export interface CollectionStore {
  // --- GLOBAL STATE --- //
  areAllArtifactsCollected: boolean,

  // --- FUNCTIONS --- //
  setAreAllArtifactsCollected: (areAllArtifactsCollected: boolean) => void,
};