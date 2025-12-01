import styled from 'styled-components/native';
import { PropsWithChildren } from 'react';
import React from 'react';
import { Dimensions } from 'react-native';
import { ScreenContainerProps } from '../../helpers/interfaces/components/ScreenContainerProps';

const { width, height } = Dimensions.get('window');


const BackgroundImage = styled.ImageBackground`
  height: ${height}px;
  width: ${width}px;  
`;

const StyledContainer = styled.View`
  margin: 0 0 50px;
`;

const ScreenContainer = ({
  backgroundImg,
  children,
}: PropsWithChildren<ScreenContainerProps>) => {
  return (
    <StyledContainer>
      <BackgroundImage source={backgroundImg}>
        {children}
      </BackgroundImage>
    </StyledContainer>
  );
};

export default ScreenContainer;
