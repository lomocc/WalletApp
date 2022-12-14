import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { ParamListBase } from '@react-navigation/native';

import React, { useCallback, useEffect, useMemo } from 'react';
import useMnemonics from '../contexts/useMnemonics';
import createMnemonic from '../utils/createMnemonic';

import { Button, SafeAreaView, SectionList, StatusBar } from 'react-native';
import HDWalletETH from '../components/HDWalletETH';
import Mnemonic from '../components/Mnemonic';

export default function WalletsScreen({
  navigation,
}: BottomTabScreenProps<ParamListBase>) {
  const initialize = useMnemonics(state => state.initialize);
  const onClearMnemonics = useMnemonics(state => state.clearMnemonics);
  const addMnemonic = useMnemonics(state => state.addMnemonic);
  const mnemonics = useMnemonics(state => state.getMnemonics());

  const onCreateMnemonic = useCallback(() => {
    const mnemonic = createMnemonic();
    addMnemonic(mnemonic);
  }, [addMnemonic]);

  const sections = useMemo(
    () =>
      mnemonics.map(mnemonic => ({
        mnemonic,
        data: [
          // {
          //   mnemonic,
          //   derivePath: "m/84'/0'/0'/0/0",
          //   symbol: 'BTC',
          // },
          {
            mnemonic,
            derivePath: "m/44'/60'/0'/0/0",
            symbol: 'ETH',
          },
        ],
      })),
    [mnemonics]
  );

  // const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = 'bg-neutral-300 dark:bg-slate-900';

  useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count

    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => onCreateMnemonic()} title="Create" />
      ),
      headerLeft: () => (
        <Button onPress={() => onClearMnemonics()} title="Clear" />
      ),
    });
  }, []);

  useEffect(() => {
    initialize();
  }, []);

  return (
    <SafeAreaView className={backgroundStyle}>
      <StatusBar
        barStyle={'dark-content'}
        // backgroundColor={backgroundStyle.backgroundColor}
      />
      <SectionList
        sections={sections}
        // keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <HDWalletETH
            mnemonic={item.mnemonic}
            derivePath={item.derivePath}
            symbol={item.symbol}
          />
        )}
        className="p-2 border rounded bg-gray-200"
        // renderItem={({ item }) => <Text>{JSON.stringify(item)}</Text>}
        renderSectionHeader={({ section: { mnemonic } }) => (
          <Mnemonic mnemonic={mnemonic} />
        )}
      />
      <Button
        onPress={() => onClearMnemonics()}
        title="clearMnemonics"
        color={'green'}
      />
    </SafeAreaView>
  );
}
