import styled from 'styled-components/native';
import { PropsWithChildren } from 'react';
import { ScreenContainerProps } from '../../helpers/interfaces/ScreenContainerProps';
import React from 'react';

const BackgroundImage = styled.ImageBackground`
  height: 100%;
  width: 100%;
`;

const ScreenContainer = ({
  backgroundImg,
  children,
}: PropsWithChildren<ScreenContainerProps>) => {
  return (
    <BackgroundImage source={backgroundImg}>{children}</BackgroundImage>
  );
};

export default ScreenContainer;
