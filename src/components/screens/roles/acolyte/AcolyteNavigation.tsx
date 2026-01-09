import AcolyteMap from './AcolyteMap';
import React, { useContext } from 'react';
import AcolyteSettings from './AcolyteSettings';
import styled from 'styled-components/native';
import { useWindowDimensions } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Images, Screens } from '../../../../helpers/constants/constants';
import { useAcolytesCurrentNavigationTabStore } from '../../../../helpers/stores/useAcolytesCurrentNavigationTabStore';

const Stack = createBottomTabNavigator();

function RootNavigation({ }: any) {

  // --- CONTEXTS--- //
  const initialRouteScreen = useAcolytesCurrentNavigationTabStore(state => state.acolyteCurrentTabNavigation);

  if (!initialRouteScreen) return null;

  const initialScreen = initialRouteScreen;

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
            case Screens.ACOLYTE_MAP:
              tabIconSource = Images.HOME_ICON;
            break;

            case Screens.ACOLYTE_SETTINGS:
              tabIconSource = Images.SETTINGS_ICON;
            break;

          }

          return <IconImage source={tabIconSource} style={{ opacity: focused ? 1 : 0.5, transform: [{ scale: focused ? 1.15 : 1 }], }} />;
        },
      })}
    >
      <Stack.Screen name={Screens.ACOLYTE_MAP} component={AcolyteMap} />
      <Stack.Screen name={Screens.ACOLYTE_SETTINGS} component={AcolyteSettings} />
    </Stack.Navigator>
  );

}

export default function AcolyteNavigation() {

  return (
    <>
      <NavigationContainer>
        <RootNavigation initialRouteScreen={Screens.ACOLYTE_MAP} />
      </NavigationContainer>
    </>
  );

}