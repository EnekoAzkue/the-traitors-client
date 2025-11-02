import styled from 'styled-components/native';
import { PropsWithChildren, ReactNode } from 'react';
import { ScreenContainerProps } from '../../helpers/interfaces/ScreenContainerProps';
import React from 'react';
import { Images, navigationTabMarginBottomForScreens } from '../../helpers/constants/constants';
import { View, Text } from 'react-native';
const BackgroundImage = styled.ImageBackground`
  height: 100%;
  width: 100%;  
`;

const ScreenContainer = ({
  backgroundImg,
  children,
}: PropsWithChildren<ScreenContainerProps>) => {
  return (
    <View style={{ marginBottom: navigationTabMarginBottomForScreens }}>
      <BackgroundImage source={backgroundImg}>
        {children}
      </BackgroundImage>
    </View>
  );
};

export default ScreenContainer;
