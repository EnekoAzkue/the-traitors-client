import { ScaledSize } from "react-native";
import styled from "styled-components/native";

export function getIstvanLabScreenStyledComponents(screenDimensions: ScaledSize) {
  const { width, height } = screenDimensions;

  const BackgroundImage = styled.ImageBackground`
    width: ${width}px;
    height: ${height * 0.938}px;
  `;

  const StyledContainer = styled.View`
    width: ${width}px;
    height: ${height * 0.938}px;
  `;

  const StyledCameraContainer = styled.View`
    width: ${width}px;
    height: ${height}px;
  `;

  return { BackgroundImage, StyledContainer, StyledCameraContainer };
}
