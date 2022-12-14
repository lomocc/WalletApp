import { ethers } from 'ethers';
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { SvgCss } from 'react-native-svg';
import ethereumSvg from '../assets/icons/ethereum-eth-logo.svg';

interface Props {
  mnemonic: string;
  derivePath: string;
  symbol: string;
}
export default function HDWalletETH({ mnemonic, derivePath, symbol }: Props) {
  const wallet = useMemo(
    () => ethers.utils.HDNode.fromMnemonic(mnemonic).derivePath(derivePath),
    [mnemonic, derivePath]
  );
  return (
    <View>
      <SvgCss width={16} height={16} xml={ethereumSvg} />
      <Text className="text-2xl text-green-500 font-bold">
        {wallet.address}
      </Text>
    </View>
  );
}
