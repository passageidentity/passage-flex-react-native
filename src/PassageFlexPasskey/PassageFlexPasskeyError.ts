export class PassageFlexPasskeyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PassageFlexPasskeyError';
  }
}
