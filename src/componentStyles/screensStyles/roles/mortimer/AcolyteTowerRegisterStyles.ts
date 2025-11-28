import { ScaledSize } from "react-native";
import styled from "styled-components/native";

export function getMortimersAcolyteTowerRegisterStyledComponents (screenDimensions: ScaledSize, insideTower: boolean) {
  // Tamaño del componente más grande y proporcional
  const componentWidth = screenDimensions.width * 0.95; // ancho máximo 400px
  const componentHeight = screenDimensions.height * 0.20; // más alto que antes
  const imageSize = componentHeight * 0.65;
  const baseFont = componentHeight * 0.2;

  const ComponentContainer = styled.View`
    border: 1px solid rgba(47, 0, 75, 1);
    border-radius: 8px;
    background: rgba(0, 0, 0, 1);
    margin: ${componentHeight* 0.05}px ${componentHeight* 0.05}px 0px ${componentHeight* 0.05}px;
    width: ${componentWidth}px;
    height: ${componentHeight}px;
    filter : grayscale(${insideTower ? 0 : 100}%);
    flex-direction: column;
    justify-content: center;
    padding-left: ${componentWidth * 0.05}px;
  `;


  const AcolyteImage = styled.Image`
    height: ${imageSize}px;
    width: ${imageSize}px;
    border-radius: ${imageSize / 2}px;
    border: 2px solid rgba(48, 0, 88, 1);
    position: absolute;
    top: ${componentHeight * 0.15}px;
    right: ${componentWidth * 0.05}px;
  `;

  const StyledAcolyteName = styled.Text`
    color: white;
    font-size: ${baseFont * 1.25 }px;
    font-family: 'KochAltschrift';
  `;

  const StyledAcolyteInfo = styled.Text`
    color: rgba(224, 211, 31, 1);
    font-family: "KochAltschrift";
    font-size: ${baseFont * 0.8}px;
    margin-top: 2px;
    padding-left: ${componentWidth * 0.025}px;

  `;

  const StyledAcolyteClass = styled.Text`
    color: rgba(4, 124, 20, 1);
    font-family: "KochAltschrift";
    font-size: ${baseFont * 0.8}px;
    margin-top: 2px;
    padding-left: ${componentWidth * 0.025}px;

  `;

  return {ComponentContainer, AcolyteImage, StyledAcolyteName, StyledAcolyteInfo, StyledAcolyteClass};
}