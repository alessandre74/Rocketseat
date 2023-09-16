export class AppError {
  message?: string

  constructor(message?: string) {
    this.message = message
  }

  static isAppError(error: unknown, genericMessage: string) {
    return error instanceof AppError ? error.message : genericMessage
  }
}
