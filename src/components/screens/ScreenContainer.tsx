import styled from 'styled-components/native';
import { PropsWithChildren } from 'react';
import React from 'react';
import { Dimensions, useWindowDimensions } from 'react-native';
import { ScreenContainerProps } from '../../helpers/interfaces/components/ScreenContainerProps';


const ScreenContainer = ({backgroundImg, children}: PropsWithChildren<ScreenContainerProps>) => {
  // --- CONSTANTS --- //
  const { width, height } = useWindowDimensions();
  
  // --- STYLED COMPONENTS --- //
  const BackgroundImage = styled.ImageBackground`
    height: ${height}px;
    width: ${width}px;  
  `;
  
  const StyledContainer = styled.View`
    margin: 0 0 50px;
    border: 1px solid blue;

  `;
  return (
    <StyledContainer>
      <BackgroundImage source={backgroundImg}>
        {children}
      </BackgroundImage>
    </StyledContainer>
  );
};

export default ScreenContainer;
