import matchSwitch, { _ } from 'match-switch';
import React from 'react';
import HDWalletBTC from './HDWalletBTC';
import HDWalletETH from './HDWalletETH';

interface Props {
  mnemonic: string;
  derivePath: string;
  symbol: string;
}
export default function HDWallet({ mnemonic, derivePath, symbol }: Props) {
  const Component = matchSwitch(symbol, {
    BTC: HDWalletBTC,
    ETH: HDWalletETH,
    [_]: HDWalletETH,
  });
  return (
    //@ts-ignore
    <Component mnemonic={mnemonic} derivePath={derivePath} symbol={symbol} />
  );
}
