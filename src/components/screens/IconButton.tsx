import React from "react";
import styled from "styled-components/native";

type IconButtonProps = {
  width: number,
  height: number,
  xPos: number,
  yPos: number,
  backgroundImage: any,
  buttonOnPress: any,
};

export default function IconButton({ width, height, xPos, yPos, backgroundImage, buttonOnPress }: IconButtonProps) {

  const StyledButtonContainer = styled.View`
    width: ${width}px;
    height: ${height}px;
    position: absolute; 

    top: ${yPos}px;
    left: ${xPos}px;

    box-shadow: 1px 10px 10px white;
    
  `;


  const StyledButton = styled.TouchableOpacity`
  width: ${width}px;
  height: ${height}px;

  border: 1px solid white;
  border-radius: 100%;

  background: rgba(0,0,0, 0.4);




  `;

  const StyledImage = styled.Image`
  width: ${width}px;
  height: ${height}px;
`;


  return (

    <StyledButtonContainer>
      <StyledButton onPress={buttonOnPress} activeOpacity={0.5}>
        <StyledImage source={backgroundImage} />
      </StyledButton>
    </StyledButtonContainer>

  );
}