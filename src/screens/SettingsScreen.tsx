import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { ParamListBase } from '@react-navigation/native';
import React from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen(
  props: BottomTabScreenProps<ParamListBase>
) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Settings Screen</Text>
      <TouchableOpacity onPress={() => Linking.openURL('app-settings:')}>
        <Text>Open Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => Linking.openURL('prefs:root=General&path=Network')}
      >
        <Text>app-prefs</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Linking.openSettings()}>
        <Text>Linking.openSettings()</Text>
      </TouchableOpacity>
    </View>
  );
}
