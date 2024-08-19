import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'passage-flex-react-native' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const PassageFlexReactNative = NativeModules.PassageFlexReactNative
  ? NativeModules.PassageFlexReactNative
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );


/**
 * The PassageFlex class is used to easily add passkeys to your existing authentication system on Apple devices.
 *
 * @example
 * ```
 * import PassageFlex from '@passageidentity/passage-flex-react-native';
 *
 * const passageFlex = new PassageFlex('MY_APP_ID');
 * ```
 */
class PassageFlex {

  constructor(appId: String) {
    if (!appId) return;
    PassageFlexReactNative.initWithAppId(appId);
  }

};

export default PassageFlex;
