// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values';
// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims';

import {AppRegistry} from 'react-native';
import {name} from './app.json';
import App from './src/App';

AppRegistry.registerComponent(name, () => App);
