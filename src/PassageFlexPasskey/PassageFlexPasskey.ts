import { Platform } from 'react-native';
import { PassageFlexReactNative } from '../PassageFlex';
import { PassageFlexPasskeyError, PasskeyErrorCode } from './';

/**
 * The base class for utilizing Apple's native passkey APIs and Passage Flex APIs together.
 */
export class PassageFlexPasskey {
  appId: string;

  constructor(appId: string) {
    this.appId = appId;
  }

  /**
   * Checks if the user's device supports passkeys.
   */
  isSupported = (): boolean => {
    if (Platform.OS === 'ios') {
      const iosVersion = parseFloat(Platform.Version as string);
      return iosVersion >= 16;
    } else if (Platform.OS === 'android') {
      const androidVersion = Platform.Version as number;
      return androidVersion >= 28;
    } else {
      return false; // Unsupported platform
    }
  };

  /**
   * Registers a new passkey.
   *
   * Prompts the user associated with the provided Passage `transactionId` to create and register a new
   * passkey for use with your app.
   *
   * - Parameters:
   *   - transactionId: The Passage transaction id provided by your app's server.
   *   - authenticatorAttachment: (Optional) The type of authentication that will be used in this
   *   WebAuthN flow request. Defaults to `.platform`. Use `.cross-platform` for physical security
   *   key registration.
   *
   * - Returns: A single-use "nonce" from Passage server to be exchanged for an authentication token on
   * your app's server.
   *
   * - Throws: `PassageFlexPasskeyError` when passkey authorization fails.
   */
  register = async (transactionId: string): Promise<string> => {
    this.checkForPasskeySupport();
    try {
      const nonce = await PassageFlexReactNative.register(transactionId);
      return nonce;
    } catch (error: any) {
      throw new PassageFlexPasskeyError(error.code, error.message);
    }
  };

  /**
   * Authenticates with a passkey.
   *
   * Prompts the user to select a passkey for authentication for your app. If a Passage `transactionId` is provided,
   * this method will attempt to show only passkeys associated with that user account.
   *
   * - Parameters:
   *   - transactionId: (Optional) The Passage transaction id provided by your app's server.
   *
   * - Returns: A single-use "nonce" from Passage server to be exchanged for an authentication token on
   * your app's server.
   *
   * - Throws: `PassageFlexPasskeyError` when passkey authorization fails.
   */
  authenticate = async (
    transactionId: string | null = null
  ): Promise<string> => {
    this.checkForPasskeySupport();
    try {
      const nonce = await PassageFlexReactNative.authenticate(transactionId);
      return nonce;
    } catch (error: any) {
      throw new PassageFlexPasskeyError(error.code, error.message);
    }
  };

  private checkForPasskeySupport = () => {
    if (!this.isSupported) {
      throw new PassageFlexPasskeyError(
        PasskeyErrorCode.PasskeysNotSupported,
        'device does not support passkeys'
      );
    }
  };
}
