import { ScaledSize } from "react-native";
import styled from "styled-components/native";

export function getSpinnerStyledComponents(screenDimensions: ScaledSize) {
  
  /**
    * Se podria usar: 
    *  position: absolute;
    *  left: 0;
    *  right: 0;
    *  top: 0;
    *  bottom: 0;
    * 
    * Y haría lo mismo que ocupar con width y height toda la pantalla
    */

  const StyledSpinnerView = styled.View`
    position: absolute;
    width: ${screenDimensions.width}px;
    height: ${screenDimensions.height}px;
    justifyContent: center; 
    alignItems: center;   
    background-color: 'rgba(0,0,0,0.5)';
    zIndex: 1000;
  `;

  return {StyledSpinnerView};
}
