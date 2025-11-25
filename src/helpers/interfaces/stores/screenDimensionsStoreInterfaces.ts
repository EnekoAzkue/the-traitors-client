import { type ScaledSize } from "react-native";

export interface screenDimensionsStore {
  screenDimensions: ScaledSize | null,
  setScreenDimensions: (newScreenDimensions: ScaledSize) => void
}
