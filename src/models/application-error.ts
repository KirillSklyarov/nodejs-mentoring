export class ApplicationError extends Error {
  constructor(message?: string, public code?: number) {
    super(message);
  }
}
