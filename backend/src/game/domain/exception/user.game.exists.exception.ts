export class UserGameExistsException extends Error {
  constructor(message?: string) {
    super(message);
  }
}
