import { ResponseError } from '@app/errors';

export class NotFound implements ResponseError {
  public readonly statusCode = 404;
  public readonly message: string;
  constructor(entityName: string, identifier: string) {
    this.message = `Could not find any ${entityName} with identifier ${identifier}`;
  }
}
