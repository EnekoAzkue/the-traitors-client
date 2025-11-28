import React from 'react';
import IstvanLab from './IstvanLab';
import IstvanHome from './IstvanHome';
import IstvanSettings from './IstvanSettings';
import styled from 'styled-components/native';
import { BlurView } from '@react-native-community/blur';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Images, Screens } from '../../../../helpers/constants/constants';
import { useScreenDimensions } from '../../../../helpers/stores/useScreenDimensionsStore';

const Stack = createBottomTabNavigator();

function RootNavigation({ initialRouteScreen }: any) {

  const screenDimensions = useScreenDimensions( state => state.screenDimensions);
  if (!screenDimensions) return;
  
  const IconImage = styled.Image`
    width: ${screenDimensions.width * 0.1}px;
    height: ${screenDimensions.width * 0.1}px;
  `;

  return (
    <Stack.Navigator
      initialRouteName={initialRouteScreen}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarBackground: () => (
          <BlurView blurAmount={1}
            overlayColor="rgba(255 255 255 / 0.1)"

            style={{ height: '100%', backgroundColor: 'rgba(0, 0, 0, 1)' }} />
        ),
        tabBarStyle: {
          position: 'absolute',
          overflow: 'hidden',
          borderTopWidth: 0,
          boxShadow: '0 -7.5px 5px rgba(255 255 255 / 0.1)',
        },
        tabBarIcon: ({ focused, color, size }) => {

          let tabIconSource;

          switch (route.name) {
            case Screens.ISTVAN_HOME:
              tabIconSource = Images.HOME_ICON;
              break;

            case Screens.ISTVAN_LAB:
              tabIconSource = Images.LAB_ICON;
              break;

            case Screens.ISTVAN_SETTINGS:
              tabIconSource = Images.SETTINGS_ICON;
              break;

          }

          return <IconImage source={tabIconSource} style={{ opacity: focused ? 1 : 0.5, transform: [{ scale: focused ? 1.15 : 1 }], }}/>;
        },
      })}

    >
      <Stack.Screen name={Screens.ISTVAN_HOME} component={IstvanHome} />
      <Stack.Screen name={Screens.ISTVAN_LAB} component={IstvanLab} />
      <Stack.Screen name={Screens.ISTVAN_SETTINGS} component={IstvanSettings} />

    </Stack.Navigator>
  );
}

export default function IstvanNavigation() {

  return (
    <>
      <NavigationContainer>
        <RootNavigation initialRouteScreen={Screens.ISTVAN_HOME} />
      </NavigationContainer>


    </>

  );
}
