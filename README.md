# passage-flex-react-native

Passkey Flex provides passkey authentication support to existing authentication systems. It handles the hard parts of incorporating native passkey APIs and provides a simple, clean solution to take your authentication to the next level.

Use the `passage-flex-react-native` SDK to implement Passkey Flex in your React Native app to use passkeys to register and authenticate, or as added security on secure user actions.

For full documentation, including setting up a backend SDK, visit the [Passkey Flex documentation here](https://docs-v2.passage.id/flex).

## Prerequisites

### A Passkey Flex app

1. Create a Passkey Flex app in the Passage Console at https://console.passage.id 
2. Add an Android and/or iOS app in the Native Apps section
3. When you add your Native App info, you can generate the associated domain file for that app if you haven’t already created it yourself, as shown below:

https://docs-v2.passage.id/_next/image?url=%2Fimages%2Fdownload-config.png&w=3840&q=75

### Hosted associated domains files

In order for passkeys to work, you’ll need to associate your native app(s) with the public web domain you assigned to your Passkey Flex app.

Android requires an `assetlinks.json` file configured and hosted (learn more [here](https://developer.android.com/identity/sign-in/credential-manager#add-support-dal)).

Apple requires an `apple-app-site-association` file configured and hosted (learn more [here](https://developer.apple.com/documentation/Xcode/supporting-associated-domains)).

## Installation

Install this package using npm:

```
npm i --save @passage/passage-flex-react-native
```

## App configuration

### Expo

- Add plugin in app.json
    
    ```json
    "plugins": [
          "@passageidentity/passage-flex-react-native",
          // ...
    ]
    ```
    
- Add `ASSOCIATED_DOMAIN` value to `.env` (in your app root)
    
    ```
    ASSOCIATED_DOMAIN=example.com
    ```
    
- Run `npx expo prebuild`

### Bare React Native

See our [Passkey Complete documentation](https://docs.passage.id/mobile/cross-platform/cross-platform-passkey-configuration) for setting up a React Native app for passkeys and Passage.

## Usage

Import PassageFlex:

```tsx
import { PassageFlex } from '@passageidentity/passage-flex-react-native';
```

Initialize a Passage Flex instance using your `appId` found in [Passage Console](https://console.passage.id/):

```tsx
const passageFlex = new PassageFlex('YOUR_APP_ID');
```

### passageFlex.passkey.register

To register a new user passkey, use the `passageFlex.passkey.register` method.

Example:

```tsx
const onPressRegister = async () => {
	// 1. Get transaction id string from your backend.
	const transactionId = await getRegisterTransactionId("newuser@email.com");
	// 2. Prompt user to create a passkey and get a Passage nonce value on success.
  const nonce = await passageFlex.passkey.register(transactionId);
  // 3. You can send this nonce to your backend to complete user registration.
};
```

### passageFlex.passkey.authenticate

To log in a user using a passkey, use the `passageFlex.passkey.authenticaete` method.

Example:

```tsx
const onPressLogIn = async () => {
	// 1. Get transaction id string from your backend.
	const transactionId = await getLogInTransactionId("existinguser@email.com");
	// 2. Prompt user to create a passkey and get a Passage nonce value on success.
  const nonce = await passageFlex.passkey.authenticate(transactionId);
  // 3. You can send this nonce to your backend to complete user authentication.
};
```

### passageFlex.passkey.isSupported

You can check if a user’s device supports passkeys by calling `passageFlex.passkey.isSupported`:

```tsx
const deviceSupportsPasskeys = passageFlex.passkey.isSupported();
```

High level steps

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
