import { ScaledSize } from "react-native";
import styled from "styled-components/native";

export function getStyledSplashScreenComponents (screenDimensions: ScaledSize) {

    const SplashScreen = styled.View`
      background-color: papayawhip;
      width: ${screenDimensions.width}px;
      height: ${screenDimensions.height}px;
    `;

    const SplashStyledBackground = styled.ImageBackground`
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    `;
    return {SplashScreen, SplashStyledBackground};
}