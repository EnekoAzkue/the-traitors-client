import React from "react";
import DropShadow from "react-native-drop-shadow";
import { getIconButtonStyledComponents, iconButtonStyles } from "../componentStyles/IconButtonStyles";

// --- INTERFACES --- //
import { type IconButtonProps } from "../helpers/interfaces/components/IconButtonInterfaces";


export default function IconButton({ width, height, xPos, yPos, backgroundImage, buttonOnPress, hasBrightness = false, hasBorder = false, backgrounOpacity = 0.4 }: IconButtonProps) {

  // --- STYLED COMPONENTS --- //
  const iconButtonStyledComponentsParams = {width, height, xPos, yPos, hasBorder, backgrounOpacity};
  const {StyledButtonContainer, StyledButton, StyledImage} = getIconButtonStyledComponents(iconButtonStyledComponentsParams);

  const IconButtonChildren = () => {
    return (
      <StyledButton onPress={buttonOnPress} activeOpacity={0.5}>
        <StyledImage source={backgroundImage} borderRadius={100} />
      </StyledButton>
    );
  }

  // la propiedad box-shadow aún siendo soportada por styled-components sirve para hacer web, React-Native no lo soporta 
  return (

    <StyledButtonContainer>

      {
        (hasBrightness) ?
          <DropShadow style={iconButtonStyles.dropShadowStyle}>
            <IconButtonChildren />

          </DropShadow>
          :
          <IconButtonChildren />
      }
    </StyledButtonContainer>
  );
}