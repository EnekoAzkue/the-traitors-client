import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MortimerHome from './MortimerHome';
import MortimerLab from './MortimerLab';
import MortimerSettings from './MortimerSettings';
import MortimerTower from './MortimerTower';
import styled from 'styled-components/native';
import { Images, Screens } from '../../../../helpers/constants/constants';
import { BlurView } from '@react-native-community/blur';
import { useScreenDimensions } from '../../../../helpers/stores/useScreenDimensionsStore';
import { useMortimerInitialScreenStore } from '../../../../helpers/stores/useMortimerInitialScreenStore';

const Stack = createBottomTabNavigator();

function RootNavigation({}: any) {

  // --- ZUSTAND STORES --- //
  const mortimerInitialScreen = useMortimerInitialScreenStore( state => state.mortimerInitialScreen);
  const screenDimensions = useScreenDimensions( state => state.screenDimensions);
  if (!screenDimensions) return;
  
  const IconImage = styled.Image`
    width: ${screenDimensions.width * 0.1}px;
    height: ${screenDimensions.width * 0.1}px;
  `;

  return (
    <Stack.Navigator
      initialRouteName={mortimerInitialScreen}
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
          boxShadow: `0 -${screenDimensions.height * 0.01}px ${screenDimensions.height * 0.01}px rgba(255 255 255 / 0.1)`,
        },
        tabBarIcon: ({ focused, color, size }) => {

          let tabIconSource;

          switch (route.name) {
            case Screens.MORTIMER_HOME:
              tabIconSource = Images.HOME_ICON;
              break;

            case Screens.MORTIMER_LAB:
              tabIconSource = Images.LAB_ICON;
              break;

            case Screens.MORTIMER_SETTINGS:
              tabIconSource = Images.SETTINGS_ICON;
              break;

            case Screens.MORTIMER_TOWER: 
                tabIconSource = Images.TOWER_ICON;
            break;

          }

          return <IconImage source={tabIconSource} style={{ opacity: focused ? 1 : 0.5, transform: [{ scale: focused ? 1.15 : 1 }], }} />;
        },
      })}

    >
      <Stack.Screen name={Screens.MORTIMER_HOME} component={MortimerHome} />
      <Stack.Screen name={Screens.MORTIMER_LAB} component={MortimerLab} />
      <Stack.Screen name={Screens.MORTIMER_TOWER} component={MortimerTower} />
      <Stack.Screen name={Screens.MORTIMER_SETTINGS} component={MortimerSettings} />

    </Stack.Navigator>
  );
}

export default function MortimerNavigation() {

  return (
    <>
      <NavigationContainer>
        <RootNavigation initialRouteScreen={Screens.MORTIMER_HOME} />
      </NavigationContainer>
    </>

  );
}
