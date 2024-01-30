export class ExpressError extends Error {
  statusCode: number;
  message: any;
  constructor(message: any, statusCode: number) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}
