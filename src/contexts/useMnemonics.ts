import Keychain from 'react-native-keychain';
import create from 'zustand';

interface MnemonicsStore {
  mnemonics: string[];
  initialize: () => Promise<void>;
  getMnemonics: () => string[];
  addMnemonic: (value: string) => Promise<void>;
  removeMnemonic: (value: string) => Promise<void>;
  clearMnemonics: () => Promise<void>;
}

/**
 * useMnemonics
 */
const useMnemonics = create<MnemonicsStore>()((set, get) => ({
  mnemonics: [],
  initialize: async () => {
    const flagOrCredentials = await Keychain.getGenericPassword();
    if (flagOrCredentials) {
      try {
        const mnemonics = JSON.parse(flagOrCredentials.password);
        set({ mnemonics });
      } catch (error) {
        const clearMnemonics = get().clearMnemonics;
        await clearMnemonics();
      }
    }
  },
  getMnemonics: () => {
    return get().mnemonics;
  },
  addMnemonic: async value => {
    const mnemonics = get().mnemonics.concat([value]);
    await Keychain.setGenericPassword('mnemonics', JSON.stringify(mnemonics));
    set({ mnemonics });
  },
  removeMnemonic: async value => {
    const mnemonics = get().mnemonics.filter(mnemonic => mnemonic !== value);
    const flag = await Keychain.setGenericPassword(
      'mnemonics',
      JSON.stringify(mnemonics)
    );
    if (flag) {
      set({ mnemonics });
    }
  },
  clearMnemonics: async () => {
    const flag = await Keychain.resetGenericPassword();
    if (flag) {
      set({ mnemonics: [] });
    }
  },
}));
export default useMnemonics;
