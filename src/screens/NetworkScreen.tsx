import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { ParamListBase } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';

import Keychain from 'react-native-keychain';

export default function NetworkScreen(
  props: BottomTabScreenProps<ParamListBase>
) {
  const [data, setData] = useState();

  const loadAndSetCredentials = async () => {
    const data = await fetch('https://beta-stake.rockx.com/api/v1/chain/list', {
      method: 'POST',
    }).then(data => data.json());

    // setData(data);

    const password = JSON.stringify(data);

    try {
      await Keychain.setGenericPassword(
        'lomocc',
        'enou cere sock brig tena ciga init expo ocea yard coun wher'
      );
      await Keychain.setGenericPassword(
        'lomocc2',
        'ketc remi tiny ener fibe expr easy bull monk ging spen deco'
      );
    } catch (error) {
      console.log("Keychain couldn't be accessed!", error);
    }
  };
  const getCredentials = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      console.log(credentials);
    } catch (error) {
      console.log("Keychain couldn't be accessed!", error);
    }
  };
  const removeCredentials = async () => {
    try {
      const credentials = await Keychain.resetGenericPassword();
    } catch (error) {
      console.log("Keychain couldn't be accessed!", error);
    }
  };

  useEffect(() => {
    fetch('https://beta-stake.rockx.com/api/v1/chain/list', { method: 'POST' })
      .then(data => data.json())
      .then(data => {
        setData(data);
      });
  }, []);

  return (
    <SafeAreaView>
      <StatusBar
      // barStyle={'dark-content'}
      // backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        // className={backgroundStyle}
      >
        <View className="bg-white dark:bg-black">
          <Text className="text-xl">{data ? JSON.stringify(data) : null}</Text>
        </View>
        <Button
          onPress={() => loadAndSetCredentials()}
          title="loadAndSetCredentials"
          color={'green'}
        />
        <Button
          onPress={() => getCredentials()}
          title="getCredentials"
          color={'blue'}
        />
        <Button
          onPress={() => removeCredentials()}
          title="removeCredentials"
          color={'red'}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
