import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AcolyteHome from './AcolyteHome';
import AcolyteLab from './AcolyteLab';
import AcolyteSettings from './AcolyteSettings';
import styled from 'styled-components/native';
import { Images, Screens } from '../../../../helpers/constants/constants';
import { BlurView } from '@react-native-community/blur';
import IconButton from '../../IconButton';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets, initialWindowMetrics, } from 'react-native-safe-area-context';
import AcolyteTower from './AcolyteTower';
// const TabIcon = styled.Image`
//   position: relative;
//   top: 5px;
//   width: 35px;
//   height: 35px;
//   filter: brightness(${props => (props.$focused ? 150 : 100)}%)
//     grayscale(${props => (props.$focused ? 0 : 100)}%);
// `;
// const Navigator = createBottomTabNavigator({
//     screenOptions: ({ route }) => {
//         return {
//             headerShown: false,
//             tabBarShowLabel: false,
//             tabBarIcon: ({ focused }) => {
//                 let tabIconSource;

//                 switch (route.name) {
//                     case Screens.ACOLYTE_HOME:
//                         tabIconSource = Images.HOME_ICON;
//                         break;

//                     case Screens.ACOLYTE_SETTINGS:
//                         tabIconSource = Images.SETTINGS_ICON;
//                         break;

//                     case Screens.ACOLYTE_LAB:
//                         tabIconSource = Images.LAB_ICON;
//                         break;
//                 }

//                 return <TabIcon source={tabIconSource} $focused={focused} />;
//             },
//             tabBarBackground: () => {
//                 return (
//                     <BlurView
//                         blurAmount={1}
//                         overlayColor="rgba(0 0 0 / 0.1)"
//                         style={{ height: '100%' }}
//                     />
//                 );
//             },
//             tabBarStyle: {
//                 position: 'absolute',
//                 overflow: 'hidden',
//                 borderTopWidth: 0,
//                 boxShadow: '0 -7.5px 5px rgba(255 255 255 / 0.1)',
//             },
//             headerShown: false,
//         };
//     },
//     screens: {
//         AcolyteHome,
//         AcolyteLab,
//         AcolyteSettings,
//     },
// });

// const AcolyteNavigation = createStaticNavigation(Navigator);


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
            case Screens.ACOLYTE_HOME:
              tabIconSource = Images.HOME_ICON;
              break;

            case Screens.ACOLYTE_SETTINGS:
              tabIconSource = Images.SETTINGS_ICON;
              break;

            case Screens.ACOLYTE_LAB:
              tabIconSource = Images.LAB_ICON;
              break;

            case Screens.ACOLYTE_TOWER:
              tabIconSource = Images.TOWER_ICON;
              break;

          }

          return <IconImage source={tabIconSource} />;
        },
      })}

    >
      <Stack.Screen name={Screens.ACOLYTE_HOME} component={AcolyteHome} />
      <Stack.Screen name={Screens.ACOLYTE_LAB} component={AcolyteLab} />
      <Stack.Screen name={Screens.ACOLYTE_TOWER} component={AcolyteTower} />
      <Stack.Screen name={Screens.ACOLYTE_SETTINGS} component={AcolyteSettings} />

    </Stack.Navigator>
  );
}

export default function AcolyteNavigation({ initialRouteScreen }: any) {

  return (
    <>
      <NavigationContainer>
        <RootNavigation initialRouteScreen={initialRouteScreen} />
      </NavigationContainer>


    </>

  );
}
