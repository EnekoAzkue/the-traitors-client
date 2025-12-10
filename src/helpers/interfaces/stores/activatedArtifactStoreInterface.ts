import Artifact from "../Artifact";

export interface activatedArtifactStore {
  // --- GLOBAL STATE --- //
  activatedArtifacts: Artifact[],

  // --- FUNCTIONS --- //
  setActivatedArtifacts: (newArtifacts: Artifact[]) => void,
};