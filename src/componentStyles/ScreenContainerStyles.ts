import { ScaledSize } from "react-native";
import styled from "styled-components/native";


export function getScreenContainerStyledComponents(screenDimensions: ScaledSize){

  const BackgroundImage = styled.ImageBackground`
    height: ${screenDimensions.height}px;
    width: ${screenDimensions.width}px;  
  `;

  const StyledContainer = styled.View`
    margin: 0 0 50px;
  `;

  return {BackgroundImage, StyledContainer};
};