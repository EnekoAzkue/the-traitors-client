import React, { useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AcolyteHome from './AcolyteHome';
import AcolyteLab from './AcolyteLab';
import AcolyteSettings from './AcolyteSettings';
import styled from 'styled-components/native';
import { Images, Screens, SocketClientToServerEvents } from '../../../../helpers/constants/constants';
import { BlurView } from '@react-native-community/blur';
import IconButton from '../../IconButton';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets, initialWindowMetrics, } from 'react-native-safe-area-context';
import AcolyteTower from './AcolyteTower';
import { UserContext } from '../../../../helpers/contexts/contexts';
import { socket } from '../../../../helpers/socket/socket';


const Stack = createBottomTabNavigator();


const IconImage = styled.Image`
  position: relative;
  top: 5px;
  width: 35px;
  height: 35px;
`;



function RootNavigation({ initialRouteScreen }: any) {

  const userContext = useContext(UserContext);

  if (!userContext) {
    return null;
  }

  const [user] = userContext;

  const [screen, setScreen] = useState<string>('')

  
  const home = () => {
    setScreen('home')
  }
  
  const settings = () => {
    setScreen('settings')
  }
  
  const lab = () => {
    setScreen('lab')
  }
  
  const tower = () => {
    setScreen('tower')
  }
  
  useEffect(() => {
    if(screen === 'tower' ) {
      console.log('set screen to tower')
      socket.emit(SocketClientToServerEvents.UPDATE_INTOWER, user.email, true)
    } else {
      socket.emit(SocketClientToServerEvents.UPDATE_INTOWER, user.email, false)
    }
  }, [screen])


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
        tabBarStyle: user.isInside || user.insideTower
          ? { display: 'none' }
          : {
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
      <Stack.Screen name={Screens.ACOLYTE_HOME} component={AcolyteHome} listeners={
        {
          tabPress: () => {
            home();

          }
        }} />
      <Stack.Screen name={Screens.ACOLYTE_LAB} component={AcolyteLab} listeners={
        {
          tabPress: () => {

            lab();

          }
        }} />
      <Stack.Screen name={Screens.ACOLYTE_TOWER} component={AcolyteTower} listeners={
        {
          tabPress: () => {

            tower();

          }
        }} />
      <Stack.Screen name={Screens.ACOLYTE_SETTINGS} component={AcolyteSettings} listeners={
        {
          tabPress: () => {
            settings();

          }
        }} />

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
