export class CustomError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super();
    this.code = code;
    this.message = message;
  }
}

export default CustomError;
