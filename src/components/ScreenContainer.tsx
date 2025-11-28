import React from 'react';
import { PropsWithChildren } from 'react';
import { useScreenDimensions } from '../helpers/stores/useScreenDimensionsStore';
import { ScreenContainerProps } from './../helpers/interfaces/components/ScreenContainerProps'
import { getScreenContainerStyledComponents } from '../componentStyles/ScreenContainerStyles';

const ScreenContainer = ({ backgroundImg, children, }: PropsWithChildren<ScreenContainerProps>) => {
  
  // --- SCREEN DIMENSIONS --- //
  const screenDimensions = useScreenDimensions(state => state.screenDimensions);
  if (!screenDimensions) return;

  // --- BUTTON STYLED COMPONENTS --- //
  const {BackgroundImage, StyledContainer} = getScreenContainerStyledComponents(screenDimensions);

  return (
    <StyledContainer>
      <BackgroundImage source={backgroundImg}>
        {children}
      </BackgroundImage>
    </StyledContainer>
  );
};

export default ScreenContainer;
