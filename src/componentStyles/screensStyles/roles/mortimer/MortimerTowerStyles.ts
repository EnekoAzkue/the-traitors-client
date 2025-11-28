import styled from "styled-components/native";

// --- INTERFACES --- //
import { type ScaledSize } from "react-native";


export function getMortimerTowerScreenStyledComponents(screenDimensions: ScaledSize){
  const AcolytesRegisterScreenContainer = styled.View`
    align-items: center; 
    flex: 1; 
    width: ${screenDimensions.width}px;
    height: ${screenDimensions.height * 0.91}px;
    margin-top: ${screenDimensions.height * 0.01}px;
    position: absolute;
  `;

  const AcolytesRegisterListContainer = styled.ScrollView`
    flex: 1;
    width: ${screenDimensions.width * 0.99}px;
    height: ${screenDimensions.height * 0.91}px;
    border: 1px solid rgba(85, 0, 134, 1);
    border-radius: 8px;
    background-color: rgba(0,0,0,0.3);
  `;

  return {AcolytesRegisterScreenContainer, AcolytesRegisterListContainer};
};