import * as bitcoin from 'bitcoinjs-lib';
import { ethers } from 'ethers';
import React, { useMemo } from 'react';
import { Text } from 'react-native';

interface Props {
  mnemonic: string;
  derivePath: string;
  symbol: string;
}
export default function HDWalletBTC({ mnemonic, derivePath, symbol }: Props) {
  const wallet = useMemo(
    () => ethers.utils.HDNode.fromMnemonic(mnemonic).derivePath(derivePath),
    [mnemonic, derivePath]
  );
  const p2wpkh = useMemo(() => {
    const publicKey = Buffer.from(wallet.publicKey.replace(/^0x/i, ''), 'hex');
    const p2wpkh = bitcoin.payments.p2wpkh({
      pubkey: publicKey,
    });
    return p2wpkh;
  }, [wallet, mnemonic, derivePath]);
  return (
    <Text className="text-2xl text-amber-500 font-bold">{p2wpkh.address}</Text>
  );
}
