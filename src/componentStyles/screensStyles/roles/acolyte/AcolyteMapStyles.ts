import styled from "styled-components/native";

// --- INTERFACES --- //
import { ScaledSize, StyleSheet } from "react-native";


export function getAcolyteMapScreenStyledComponents(screenDimensions: ScaledSize) {
  const { width, height } = screenDimensions;

  const StyledAcolyteMapContainer = styled.ImageBackground`
      width: ${width}px;
      height: ${height}px;
    `;

  return { StyledAcolyteMapContainer };
}

export const acolyteMapStyles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  cloudOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  cloudImage: {
    width: "100%",
    height: "100%",
  },
  darkFilter: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(10, 15, 30, 0.7)", // tinte nocturno muy suave
  },
});