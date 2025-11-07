import styled from 'styled-components/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from '@react-native-community/blur';
import { createStaticNavigation } from '@react-navigation/native';
import React from 'react';
import { Images, Screens } from '../../../../helpers/constants/constants';
import MortimerLab from './MortimerLab';
import MortimerHome from './MortimerHome';
import MortimerSettings from './MortimerSettings';
import MortimerTower from './MortimerTower';

const TabIcon = styled.Image`
  position: relative;
  top: 5px;
  width: 35px;
  height: 35px;
  filter: brightness(${props => (props.$focused ? 150 : 100)}%)
    grayscale(${props => (props.$focused ? 0 : 100)}%);
`;

const Navigator = createBottomTabNavigator({
    screenOptions: ({ route }) => {
        return {
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => {
                let tabIconSource;

                switch (route.name) {
                    case Screens.MORTIMER_HOME:
                        tabIconSource = Images.HOME_ICON;
                        break;

                    case Screens.MORTIMER_SETTINGS:
                        tabIconSource = Images.SETTINGS_ICON;
                        break;

                    case Screens.MORTIMER_LAB:
                        tabIconSource = Images.LAB_ICON;
                        break;

                    case Screens.MORTIMER_TOWER:
                        tabIconSource = Images.TOWER_ICON;
                        break;
                }

                return <TabIcon source={tabIconSource} $focused={focused} />;
            },
            tabBarBackground: () => {
                return (
                    <BlurView
                        blurAmount={1}
                        overlayColor="rgba(0 0 0 / 0.1)"
                        style={{ height: '100%' }}
                    />
                );
            },
            tabBarStyle: {
                position: 'absolute',
                overflow: 'hidden',
                borderTopWidth: 0,
                boxShadow: '0 -7.5px 5px rgba(255 255 255 / 0.1)',
            },
            headerShown: false,
        };
    },
    screens: {
        MortimerLab,
        MortimerHome,
        MortimerTower,
        MortimerSettings,
    },
});

const MortimerNavigation = createStaticNavigation(Navigator);

export default MortimerNavigation;
