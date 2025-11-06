import styled from 'styled-components/native';
import { PropsWithChildren, ReactNode } from 'react';
import { ScreenContainerProps } from '../../helpers/interfaces/ScreenContainerProps';
import React from 'react';
import { Images, navigationTabMarginBottomForScreens } from '../../helpers/constants/constants';
import { View, Text } from 'react-native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');


const BackgroundImage = styled.ImageBackground`
  height: ${height}px;
  width: ${width}px;  
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
