import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'passage-flex-react-native' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

export const PassageFlexReactNative = NativeModules.PassageFlexReactNative
  ? NativeModules.PassageFlexReactNative
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );
