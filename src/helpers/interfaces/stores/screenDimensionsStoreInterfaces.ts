import { type ScaledSize } from "react-native";

export interface ScreenDimensionsStore {
  screenDimensions: ScaledSize | null,
  setScreenDimensions: (newScreenDimensions: ScaledSize) => void
}
