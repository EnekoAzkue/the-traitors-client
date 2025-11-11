import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IstvanHome from './IstvanHome';
import IstvanLab from './IstvanLab';
import IstvanSettings from './IstvanSettings';
import styled from 'styled-components/native';
import { Images, Screens } from '../../../../helpers/constants/constants';
import { BlurView } from '@react-native-community/blur';

const Stack = createBottomTabNavigator();


const IconImage = styled.Image`
  position: relative;
  top: 5px;
  width: 35px;
  height: 35px;
`;



function RootNavigation({ initialRouteScreen }: any) {

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

          return <IconImage source={tabIconSource} />;
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
