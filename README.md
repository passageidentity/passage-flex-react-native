![passage-flex-react-native](https://storage.googleapis.com/passage-docs/github-md-assets/passage-flex-react-native.png)

![NPM Version](https://img.shields.io/npm/v/%40passageidentity%2Fpassage-flex-react-native?link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F%40passageidentity%2Fpassage-flex-react-native) [![React Native](https://img.shields.io/badge/React_Native-%2320232a.svg?logo=react&logoColor=%2361DAFB)](#) ![NPM Type Definitions](https://img.shields.io/npm/types/%40passageidentity%2Fpassage-flex-react-native) ![GitHub License](https://img.shields.io/github/license/passageidentity/passage-flex-react-native)
 ![Static Badge](https://img.shields.io/badge/Built_by_1Password-grey?logo=1password)


## About

[Passage by 1Password](https://1password.com/product/passage) unlocks the passwordless future with a simpler, more secure passkey authentication experience. Passage handles the complexities of the [WebAuthn API](https://blog.1password.com/what-is-webauthn/), and allows you to implement passkeys with ease. 

Use [Passkey Flex](https://docs.passage.id/flex) to add passkeys to an existing authentication experience.

Use [Passkey Complete](https://docs.passage.id/complete) as a standalone passwordless auth solution.

Use [Passkey Ready](https://docs.passage.id/passkey-ready) to determine if your users are ready for passkeys.



### In passage-flex-react-native

Use passage-flex-react-native to implement Passkey Flex in your Swift application to add native passkey authentication in your own authentication flows.


| Product | Compatible |
| --- | --- |
| ![Passkey Flex](https://storage.googleapis.com/passage-docs/github-md-assets/passage-passkey-flex-icon.png) Passkey **Flex** | ✅
| ![Passkey Complete](https://storage.googleapis.com/passage-docs/github-md-assets/passage-passkey-complete-icon.png) Passkey **Complete** | ✖️ For Passkey Complete, check out [passage-react-native](https://github.com/passageidentity/passage-react-native)
| ![Passkey Ready](https://storage.googleapis.com/passage-docs/github-md-assets/passage-passkey-ready-icon.png) Passkey **Ready** | ✖️ For Passkey Ready, check out [Authentikit for Android](https://github.com/passageidentity/passage-android/tree/main/authentikit) and [Authentikit for iOS](https://github.com/passageidentity/passage-authentikit-ios) |

## Getting Started

### Check Prerequisites

<p>
 You'll need a free Passage account and a Passkey Flex app set up in <a href="https://console.passage.id/">Passage Console</a> to get started. <br />
 <sub><a href="https://docs.passage.id/home#passage-console">Learn more about Passage Console →</a></sub>
</p>

Add an Android and/or iOS app in the Native Apps section.

When you add your Native App info, you can generate the associated domain file for that app if you haven’t already created it yourself, as shown below:
![Passage Native Apps screenshot](https://docs.passage.id/_next/image?url=%2Fimages%2Fv1-doc-images%2Fios-download-config-file.png&w=3840&q=75)

### Install
```shell
npm i --save @passageidentity/passage-flex-react-native
```

#### Expo

Add plugin in app.json:
    
  ```json
    "plugins": [
          "@passageidentity/passage-flex-react-native"
    ]
  ```
    
Add `ASSOCIATED_DOMAIN` value to your app's `.env` file:
    
```
  ASSOCIATED_DOMAIN=example.com
```
    
Run the following:
```
npx expo prebuild
```

#### Bare React Native

See our [Passkey Complete documentation](https://docs.passage.id/complete/cross-platform-passkey-configuration/cross-platform-ios-configuration) for setting up a React Native app for passkeys and Passage.

#### Hosted associated domains files

In order for passkeys to work, you’ll need to associate your native app(s) with the public web domain you assigned to your Passkey Flex app.

Android requires an `assetlinks.json` file configured and hosted (learn more [here](https://developer.android.com/identity/sign-in/credential-manager#add-support-dal)).

Apple requires an `apple-app-site-association` file configured and hosted (learn more [here](https://developer.apple.com/documentation/Xcode/supporting-associated-domains)).


### Import
```tsx
import { PassageFlex } from '@passageidentity/passage-flex-react-native';
```

### Initialize
```tsx
const passageFlex = new PassageFlex('YOUR_PASSAGE_APP_ID');
```

### Go Passwordless

Find all more details about Passkey Flex on our [Passkey Flex Documentation](https://docs.passage.id/flex) page.

# API Reference

### passageFlex.passkey.register

To register a new user passkey, use the `passageFlex.passkey.register` method.

This is a three step process:
1. Your app should POST a user identifier (like an email) to your backend, which should request a transaction id from the Passage server to return to your app.
2. Your app should then call `passageFlex.passkey.register(transactionId)` to prompt your user to create a passkey. On success, the `register` method will return a nonce.
3. Lastly, your app should send this nonce to your backend to verify the user has been registered successfully. At this point, your backend could return an access token.

Example:

```tsx
const onPressRegister = async () => {
  // 1. Get transaction id string from your backend.
  const transactionId = await getRegisterTransactionId("newuser@email.com");
  // 2. Prompt user to create a passkey and get a Passage nonce value on success.
  const nonce = await passageFlex.passkey.register(transactionId);
  // 3. You can send this nonce to your backend to complete user registration.
  const accessToken = await getAccessToken(nonce);
};
```

### passageFlex.passkey.authenticate

To log in a user using a passkey, use the `passageFlex.passkey.authenticate` method.

This is a three step process:
1. Your app should POST a user identifier (like an email) to your backend, which should request a transaction id from the Passage server to return to your app.
2. Your app should then call `passageFlex.passkey.authenticate(transactionId)` to prompt your user to log in with a passkey. On success, the `authenticate` method will return a nonce.
3. Lastly, your app should send this nonce to your backend to verify the user has been authenticated successfully. At this point, your backend could return an access token.


Example:

```tsx
const onPressLogIn = async () => {
  // 1. Get transaction id string from your backend.
  const transactionId = await getLogInTransactionId("existinguser@email.com");
  // 2. Prompt user to create a passkey and get a Passage nonce value on success.
  const nonce = await passageFlex.passkey.authenticate(transactionId);
  // 3. You can send this nonce to your backend to complete user authentication.
  const accessToken = await getAccessToken(nonce);
};
```

### passageFlex.passkey.isSupported

You can check if a user’s device supports passkeys by calling `passageFlex.passkey.isSupported`:

```tsx
const deviceSupportsPasskeys = passageFlex.passkey.isSupported();
```

## Support & Feedback

We are here to help! Find additional docs, the best ways to get in touch with our team, and more within our [support resources](https://github.com/passageidentity/.github/blob/main/SUPPORT.md). 

<br />

---

<p align="center">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://storage.googleapis.com/passage-docs/github-md-assets/passage-by-1password-dark.png">
      <source media="(prefers-color-scheme: light)" srcset="https://storage.googleapis.com/passage-docs/github-md-assets/passage-by-1password-light.png">
      <img alt="Passage by 1Password Logo" src="https://storage.googleapis.com/passage-docs/github-md-assets/passage-by-1password-light.png">
    </picture>
</p>

<p align="center">
    <sub>Passage is a product by <a href="https://1password.com/product/passage">1Password</a>, the global leader in access management solutions with nearly 150k business customers.</sub><br />
    <sub>This project is licensed under the MIT license. See the <a href="LICENSE">LICENSE</a> file for more info.</sub>
</p>
