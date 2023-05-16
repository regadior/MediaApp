export class EmailUsedException extends Error {
  constructor(message?: string) {
    super(message);
  }
}
