import styled from "styled-components/native";

// --- INTERFACES --- //
import { type ScaledSize } from "react-native";



export function getAcolyteSchoolMapStyledComponents(screenDimensions: ScaledSize) {
  const { width, height } = screenDimensions;


  const StyledAcolyteSchoolMapImageBackground = styled.ImageBackground`
      width: ${width}px;
      height: ${height}px;
    `;


  return { StyledAcolyteSchoolMapImageBackground };

}