import React, { useMemo } from 'react';
import { Text } from 'react-native';

interface Props {
  mnemonic?: string;
}
export default function Mnemonic({ mnemonic }: Props) {
  const regexp = useMemo(() => {
    const numElements = 4;
    return new RegExp(`^(\\w{${numElements}}).*(\\w{${numElements}})$`);
  }, []);
  const mnemonicStr = useMemo(
    () => mnemonic?.replace(regexp, '$1...$2'),
    [mnemonic]
  );
  return (
    <Text className="text-2xl font-bold sticky top-0 truncate p-2">
      {mnemonicStr}
    </Text>
  );
}
