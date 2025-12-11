import React, { useEffect } from "react";
import { useWindowDimensions, View } from "react-native";
import DropShadow from "react-native-drop-shadow";
import styled from "styled-components/native";

interface ArtifactImageProps{
  image: any,
  pos: {
    x: number,
    y: number,
  },
};

export default function ArtifactImage({image, pos}: ArtifactImageProps) {
  const { width, height } = useWindowDimensions();

  const StyledImage = styled.Image`
    width: ${width * 0.15};
    height: ${width * 0.15};
  `;

  const StyledAbsoluteRosettePosition = styled.View`
    position: absolute;
    top: ${height * 0.8};
    left: ${width * 0.5};
  `;

  const StyledRelativeRosettePositionSoBeInTheMiddle = styled.View`
    position: relative;
    top: -50%;
    left: -50%;
  `;

  const StyledArtifactContainer = styled.View`
    border: 1px solid rgba(255, 255, 255, 1);
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 100%;
    width: ${width * 0.24};
    height: ${width * 0.24};
    justify-content: center;
    align-items: center;
  `;

  const dropShadowStyles = {
    shadowColor: 'rgba(255, 251, 35, 1)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 2,
    shadowRadius: 6,
  }

  return (
    <>
      <View style={{ position: 'absolute', top: `${pos.y}%`, left: `${pos.x}%` }}>
        <StyledRelativeRosettePositionSoBeInTheMiddle>
            <DropShadow style={dropShadowStyles}>
          <StyledArtifactContainer>
            <StyledImage source={image} resizeMode="cover"/>
          </StyledArtifactContainer>
          </DropShadow>
        </StyledRelativeRosettePositionSoBeInTheMiddle>
      </View>
    </>
  );
}