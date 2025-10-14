import styled from 'styled-components/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from '@react-native-community/blur';
import { createStaticNavigation } from '@react-navigation/native';
import Home from './Home';
import Settings from './Settings';
import Lab from './Lab';
import React from 'react';
import { Images, Screens } from '../../helpers/constants/constants';

const TabIcon = styled.Image`
  width: 25px;
  height: 25px;
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
                    case Screens.HOME:
                        tabIconSource = Images.BUTTON;
                        break;

                    case Screens.SETTINGS:
                        tabIconSource = Images.BUTTON;
                        break;

                    case Screens.LAB:
                        tabIconSource = Images.BUTTON;
                        break;
                }

                return <TabIcon source={tabIconSource} $focused={focused} />;
            },
            tabBarBackground: () => {
                return (
                    <BlurView
                        blurAmount={1}
                        overlayColor="rgba(218 205 176 / 0.1)"
                        style={{ height: '100%' }}
                    />
                );
            },
            tabBarStyle: {
                position: 'absolute',
                overflow: 'hidden',
                borderTopWidth: 0,
                boxShadow: '0 -11.5px 5px rgba(218 205 176 / 0.1)',
            },
            headerShown: false,
        };
    },
    screens: {
        Home,
        Settings,
        Lab,
    },
});

const ScreenNavigation = createStaticNavigation(Navigator);

export default ScreenNavigation;
