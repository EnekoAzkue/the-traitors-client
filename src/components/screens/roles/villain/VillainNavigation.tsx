import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import VillainHome from './VillainHome';
import VillainLab from './VillainLab';
import VillainSettings from './VillainSettings';
import styled from 'styled-components/native';
import { Images, Screens } from '../../../../helpers/constants/constants';
import { BlurView } from '@react-native-community/blur';
import Swamp from '../../Swamp';

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
            case Screens.VILLAIN_HOME:
              tabIconSource = Images.HOME_ICON;
              break;

            case Screens.VILLAIN_LAB:
              tabIconSource = Images.LAB_ICON;
              break;

            case Screens.VILLAIN_SWAMP:
              tabIconSource = Images.SWAMP_ICON;
              break;

            case Screens.VILLAIN_SETTINGS:
              tabIconSource = Images.SETTINGS_ICON;
              break;

          }

          return <IconImage source={tabIconSource} style={{ opacity: focused ? 1 : 0.5, transform: [{ scale: focused ? 1.15 : 1 }], }}/>;
        },
      })}

    >
      <Stack.Screen name={Screens.VILLAIN_HOME} component={VillainHome} />
      <Stack.Screen name={Screens.VILLAIN_LAB} component={VillainLab} />
      <Stack.Screen name={Screens.VILLAIN_SWAMP} component={Swamp} />
      <Stack.Screen name={Screens.VILLAIN_SETTINGS} component={VillainSettings} />
    </Stack.Navigator>
  );
}

export default function VillainNavigation() {

  return (
    <>
      <NavigationContainer>
        <RootNavigation initialRouteScreen={Screens.VILLAIN_HOME} />
      </NavigationContainer>
    </>

  );
}
