import Swamp from '../../Swamp';
import MortimerLab from './MortimerLab';
import MortimerHome from './MortimerHome';
import React, { useContext } from 'react';
import MortimerTower from './MortimerTower';
import styled from 'styled-components/native';
import MortimerSettings from './MortimerSettings';
import { useWindowDimensions } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Images, Screens } from '../../../../helpers/constants/constants';
import { MortimerInitialScreenContext } from '../../../../helpers/contexts/contexts';

const Stack = createBottomTabNavigator();

function RootNavigation({ }: any) {

  // --- CONTEXTS--- //
  const initialRouteScreen = useContext(MortimerInitialScreenContext);

  if (!initialRouteScreen) return null;
  
  const [initialScreen] = initialRouteScreen;

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
            case Screens.MORTIMER_HOME:
              tabIconSource = Images.HOME_ICON;
              break;

            case Screens.MORTIMER_LAB:
              tabIconSource = Images.LAB_ICON;
              break;

            case Screens.MORTIMER_SWAMP:
              tabIconSource = Images.SWAMP_ICON;
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
      <Stack.Screen name={Screens.MORTIMER_SWAMP} component={Swamp} />
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