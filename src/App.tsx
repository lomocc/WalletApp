import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Linking } from 'react-native';
import { SvgCss } from 'react-native-svg';
import btcSvg from './assets/icons/bitcoin-btc-logo.svg';
import bchSvg from './assets/icons/bitcoin-cash-bch-logo.svg';
import icpSvg from './assets/icons/internet-computer-icp-logo.svg';
import usdcSvg from './assets/icons/usd-coin-usdc-logo.svg';
import HomeScreen from './screens/HomeScreen';
import NetworkScreen from './screens/NetworkScreen';
import SettingsScreen from './screens/SettingsScreen';
import TransactionsScreen from './screens/TransactionsScreen';
import WalletsScreen from './screens/WalletsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  useEffect(() => {
    const subscription = Linking.addEventListener('url', ({ url }) => {
      console.log('====================================');
      console.log('url', url);
      console.log('====================================');
    });
    return () => {
      subscription.remove();
    };
  }, []);
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Transaction">
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
          name="Wallets"
          component={WalletsScreen}
          options={{
            tabBarIcon: ({ size, focused, color }) => (
              <SvgCss width={size} height={size} xml={bchSvg} />
            ),
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ size, focused, color }) => (
              <SvgCss width={size} height={size} xml={btcSvg} />
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
        <Tab.Screen
          name="Network"
          component={NetworkScreen}
          options={{
            tabBarIcon: ({ size, focused, color }) => (
              <SvgCss width={size} height={size} xml={usdcSvg} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
