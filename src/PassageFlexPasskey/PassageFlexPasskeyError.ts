export enum PasskeyErrorCode {
  PasskeyError = 'PASSKEY_ERROR',
  PasskeysNotSupported = 'PASSKEYS_NOT_SUPPORTED',
  UserCanceled = 'USER_CANCELED',
}

export class PassageFlexPasskeyError extends Error {
  constructor(
    public code: PasskeyErrorCode,
    message?: string
  ) {
    super(message);
    // This line is necessary to preserve the correct instanceof checks
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = code;
  }
}
