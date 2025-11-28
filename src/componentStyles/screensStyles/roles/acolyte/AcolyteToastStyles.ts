import { ScaledSize } from "react-native";
import styled from "styled-components/native";

export function getAcolyteToastStyledComponents(screenDimensions: ScaledSize) {

  const { width, height } = screenDimensions;
  const ToastContainer = styled.View`
    position: absolute;
    top: ${height * 0.85}px;
    left: ${width * 0.13}px;
    border: 1px solid rgba(255, 255, 255, 1);
    width: ${width * 0.75}px;
    height: ${height * 0.05}px;
    border-radius: 9px;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.75);

    fontSize: ${width * 0.2}%;
  `;

  const StyledText = styled.Text`
    text-align: center;
    color: white;
  `;

  return {ToastContainer, StyledText};
}