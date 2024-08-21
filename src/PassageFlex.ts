import PassageFlexPasskey from './PassageFlexPasskey/PassageFlexPasskey';
import { PassageFlexReactNative } from './PassageFlexReactNativeModule';

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
export class PassageFlex {
  passkey: PassageFlexPasskey;
  appId: string;

  constructor(appId: string) {
    this.appId = appId;
    this.passkey = new PassageFlexPasskey(appId);
    PassageFlexReactNative.initWithAppId(appId);
  }
}
