import React from "react";
import { useWindowDimensions } from "react-native";
import DropShadow from "react-native-drop-shadow";
import styled from "styled-components/native";

type IconButtonProps = {
  width: number,
  height: number,
  xPos: number,
  yPos: number,
  backgroundImage: any,
  buttonOnPress: any,
  hasBrightness?: boolean,
  hasBorder?: boolean,
  backgrounOpacity?: number,
  shadowColor?: string,
  iconText?: string,
};

export default function IconButton({ width, height, xPos, yPos, backgroundImage, buttonOnPress, hasBrightness = false, hasBorder = false, backgrounOpacity = 0.4, shadowColor = '#ffffffff', iconText = '' }: IconButtonProps) {

  const StyledButtonContainer = styled.View`
    width: ${width}px;
    height: ${height}px;
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

  const dropShadowStyles = {
    shadowColor: '#ffffffff',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 2,
    shadowRadius: 6,
  }

  const IconText = styled.Text`
    color: white;
    font-family: KochAltschrift;
    font-size: ${width * 0.5}px;
    text-align: center;
  `;

  const Root = styled.View`
    position: absolute;
    top: ${yPos}px;
    left: ${xPos}px;
    z-index: 600;
    align-items: center;
  `;



  const mergedDropShadowStyles = { ...dropShadowStyles, shadowColor: shadowColor }


  const IconButtonChildren = () => {
    return (
      <StyledButton onPress={buttonOnPress} activeOpacity={0.5}>
        <StyledImage source={backgroundImage} borderRadius={100} />
      </StyledButton>
    );
  }

  return (
    <Root>
      <StyledButtonContainer>
        {
          hasBrightness
            ? <DropShadow style={mergedDropShadowStyles}>
              <IconButtonChildren />
            </DropShadow>
            : <IconButtonChildren />
        }
      </StyledButtonContainer>

      {iconText && (
        <IconText>
          {iconText}
        </IconText>
      )}
    </Root>



  );
}