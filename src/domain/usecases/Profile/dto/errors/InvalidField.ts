import { InvalidError } from '@app/errors';

export class InvalidField implements InvalidError {
  public readonly message: string;
  public readonly cause: string;
  public readonly statusCode = 422;
  public readonly fields?: Record<string, string>;

  constructor(field: string, message: string) {
    this.message = `Incorrect params at ${field}`;
    this.cause = `Incorrect params at ${field}`;
    this.fields = {
      [field]: message
    };
  }
}
