import React from "react";
import DropShadow from "react-native-drop-shadow";
import styled from "styled-components/native";

type IconButtonProps = {
  width: number,
  height: number,
  xPos: number,
  yPos: number,
  backgroundImage: any,
  buttonOnPress: any,
  hasBrightness?: boolean, //Optional parameter --> must give 
  hasBorder?: boolean,
};

export default function IconButton({ width, height, xPos, yPos, backgroundImage, buttonOnPress, hasBrightness = false, hasBorder = false }: IconButtonProps) {


  // la propiedad box-shadow aún siendo soportada por styled-components sirve para hacer web, React-Native no lo soporta 
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

  ${(hasBorder) ? `border: 1px solid white;` : ``}
  border-radius: 100%;

  background: rgba(0,0,0, 0.4);

  `;

  const StyledImage = styled.Image`
  width: ${width}px;
  height: ${height}px;
`;


  const IconButtonChildren = () => {
    return (
      <StyledButton onPress={buttonOnPress} activeOpacity={0.5}>
        <StyledImage source={backgroundImage} borderRadius={100} />
      </StyledButton>
    );
  }

  return (

    <StyledButtonContainer>

      {
        (hasBrightness) ?
          // <DropShadow style={{
          //   shadowColor: '#ffffffff',
          //   shadowOffset: {
          //     width: 0,
          //     height: 0,
          //   },
          //   shadowOpacity: 2,
          //   shadowRadius: 6,
          // }}>
            <IconButtonChildren />

          // </DropShadow>
          :
          <IconButtonChildren />
      }
    </StyledButtonContainer>


  );
}