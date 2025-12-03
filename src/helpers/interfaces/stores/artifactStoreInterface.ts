import Artifact from "../Artifact";

export interface ArtifactStore {
  // --- GLOBAL STATE --- //
  artifacts: Artifact[],

  // --- FUNCTIONS --- //
  setArtifacts: (newArtifacts: Artifact[]) => void,
};