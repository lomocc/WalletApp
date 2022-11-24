import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SvgCss } from 'react-native-svg';
import btcSvg from './assets/icons/bitcoin-btc-logo.svg';
import bchSvg from './assets/icons/bitcoin-cash-bch-logo.svg';
import icpSvg from './assets/icons/internet-computer-icp-logo.svg';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import TransactionsScreen from './screens/TransactionsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen
          name="Transaction"
          component={TransactionsScreen}
          options={{
            tabBarIcon: ({ size, focused, color }) => (
              <SvgCss width={size} height={size} xml={icpSvg} />
            ),
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ size, focused, color }) => (
              <SvgCss width={size} height={size} xml={bchSvg} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ size, focused, color }) => (
              <SvgCss width={size} height={size} xml={btcSvg} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
