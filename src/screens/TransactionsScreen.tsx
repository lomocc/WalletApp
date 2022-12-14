import { TransactionRequest } from '@ethersproject/abstract-provider';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { ParamListBase } from '@react-navigation/native';
import * as ethers from 'ethers';
import React, { useCallback, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import QRCodeSvg from 'react-native-qrcode-svg';
export default function TransactionsScreen(
  props: BottomTabScreenProps<ParamListBase>
) {
  const [privateKey, setPrivateKey] = useState('');
  const [unsignedTransactionHex, setUnsignedTransactionHex] =
    useState<string>('');
  const [signedTransactionHex, setSignedTransactionHex] = useState<string>();

  // const wallet = useMemo(() => privateKey?new ethers.Wallet(privateKey):null, [privateKey]);

  const signTransaction = useCallback(async () => {
    const transaction = ethers.utils.parseTransaction(unsignedTransactionHex);
    // now broadcast this object to your offline wallet, there it can sign it
    // const mnemonic =
    //   'announce room limb pattern dry unit scale effort smooth jazz weasel alcohol';
    // const wallet = ethers.Wallet.fromMnemonic(mnemonic);

    console.log('====================================');
    console.log('transaction');
    console.log(transaction);
    console.log('====================================');

    const wallet = new ethers.Wallet(privateKey);
    const signedTransactionHex = await wallet.signTransaction(
      transaction as TransactionRequest
    );
    console.log('====================================');
    console.log('signedTransactionHex');
    console.log(signedTransactionHex);
    console.log('====================================');

    setSignedTransactionHex(signedTransactionHex);
  }, [unsignedTransactionHex, privateKey]);

  return (
    <View className="p-4 rounded">
      <Text>wallet privateKey</Text>
      <TextInput
        className="p-2 border rounded"
        multiline
        onChangeText={setPrivateKey}
        value={privateKey}
        placeholder="privateKey"
      />
      <Text>unsignedTransactionHex</Text>
      <TextInput
        className="p-2 border rounded"
        multiline
        numberOfLines={3}
        onChangeText={setUnsignedTransactionHex}
        value={unsignedTransactionHex}
        placeholder="unsignedTransactionHex"
      />
      <Button
        title="signTransaction"
        onPress={() => signTransaction()}
        color="#f194ff"
      />
      {signedTransactionHex && (
        <QRCodeSvg value={signedTransactionHex} size={256} />
      )}
    </View>
  );
}
