import Swamp from './Swamp';
import MortimerLab from './roles/mortimer/MortimerLab';
import MortimerHome from './roles/mortimer/MortimerHome';
import React, { useContext } from 'react';
import MortimerTower from './roles/mortimer/MortimerTower';
import styled from 'styled-components/native';
import MortimerSettings from './roles/mortimer/MortimerSettings';
import { useWindowDimensions } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Images, Screens } from '../../helpers/constants/constants';
import { MortimerInitialScreenContext } from '../../helpers/contexts/contexts';
import HallOfSages from './HallOfSages';
import Acolyte from './roles/acolyte/Acolyte';

const Stack = createBottomTabNavigator();

function RootNavigation({ }: any) {

  // --- CONTEXTS--- //
  const initialRouteScreen = useContext(MortimerInitialScreenContext);

  if (!initialRouteScreen) return null;

  const initialScreen = initialRouteScreen[0];

  // --- STYLED COMPONENTS --- //
  const { width, height } = useWindowDimensions();

  const IconImage = styled.Image`
    width: ${width * 0.1}px;
    height: ${width * 0.1}px;
  `;

  return (
    <Stack.Navigator
      initialRouteName={initialScreen}
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
          boxShadow: `0 -${height * 0.01}px ${height * 0.01}px rgba(255 255 255 / 0.1)`,
        },
        tabBarIcon: ({ focused }) => {

          let tabIconSource;

          switch (route.name) {
            case Screens.MAP:
              tabIconSource = Images.HOME_ICON;
              break;

            case Screens.SETTINGS:
              tabIconSource = Images.SETTINGS_ICON;
              break;

          }

          return <IconImage source={tabIconSource} style={{ opacity: focused ? 1 : 0.5, transform: [{ scale: focused ? 1.15 : 1 }], }} />;
        },
      })}
    >
      <Stack.Screen name={Screens.MAP} component={Acolyte} />
      <Stack.Screen name={Screens.SETTINGS} component={MortimerSettings} />
    </Stack.Navigator>
  );

}

export default function MortimerNavigation() {

  return (
    <>
      <NavigationContainer>
        <Router />
        <RootNavigation initialRouteScreen={null} />
      </NavigationContainer>
    </>
  );

}