import { ScaledSize } from "react-native";
import styled from "styled-components/native";

export function getQRStyledComponents(screenDimensions: ScaledSize) {
  const QRScreenContainer = styled.View`
    justify-content: center;
    align-items: center;
    height: ${screenDimensions.height * 0.15}px;
    width: ${screenDimensions.width * 0.27}px;
  `;

  const StyledQRTextContainer = styled.View`
    border: ${screenDimensions.width * 0.002}px solid orange;
    border-radius: 8px;
    width: ${screenDimensions.width * 0.75}px;    
    height: ${screenDimensions.height * 0.1}px;  
    background: rgba(0,0,0, 0.5);
    margin: 0px 0px ${screenDimensions.height * 0.08}px 0px;
  `;

  const StyledQRText = styled.Text`
    color: white;
    fontFamily: 'KochAltschrift';
    font-size: ${screenDimensions.width * 0.05}px;
    text-align: center;
  `;

  const QRContainer = styled.View`
    background: rgba(77, 208, 212, 1);
    border-radius: 2px;
    border: 3px solid rgba(255, 255, 255, 1);
    width: 55%;
    height: 26%;
    justify-content: center;
    align-items: center;
  `;

  const StyledText_1 = styled.Text`
    color: white;
    fontFamily: 'KochAltschrift';
    font-size: ${screenDimensions.width * 0.07}px;
  `;

  return {QRScreenContainer, StyledQRTextContainer, StyledQRText, QRContainer, StyledText_1};
};