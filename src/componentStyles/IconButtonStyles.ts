import styled from "styled-components/native";
import { getIconButtonStyledComponentsParams } from "../helpers/interfaces/components/IconButtonInterfaces";
import { StyleSheet } from "react-native";


export function getIconButtonStyledComponents({ width, height, xPos, yPos, hasBorder, backgrounOpacity }: getIconButtonStyledComponentsParams) {

  const StyledButtonContainer = styled.View`
    width: ${width}px;
    height: ${height}px;
    position: absolute; 

    top: ${yPos}px;
    left: ${xPos}px;
    
  `;


  const StyledButton = styled.TouchableOpacity`
    width: ${width}px;
    height: ${height}px;

    ${(hasBorder) ? 'border: 1px solid white;' : ''};
    border-radius: 100%;

    background: rgba(0,0,0, ${backgrounOpacity});
  `;

  const StyledImage = styled.Image`
    width: ${width}px;
    height: ${height}px;
  `;

  return { StyledButtonContainer, StyledButton, StyledImage };
}

export const iconButtonStyles = StyleSheet.create({
  dropShadowStyle: {
    shadowColor: '#ffffffff',
    shadowOffset: { width: 0, height: 0, },
    shadowOpacity: 2,
    shadowRadius: 6,
  },
});