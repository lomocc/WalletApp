import { ethers } from 'ethers';

export default function createMnemonic() {
  const randomBytes = ethers.utils.randomBytes(32);
  const mnemonic = ethers.utils.entropyToMnemonic(randomBytes);
  // console.log(mnemonic2);
  // const mnemonic2 = ethers.utils.entropyToMnemonic(randomBytes, 'zh_cn');
  // console.log(mnemonic);

  return mnemonic;
}
