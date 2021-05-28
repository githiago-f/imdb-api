import { InvalidError, ResponseError } from '@app/errors';
import {Response} from 'express';

export class ErrorHandler {
  constructor(private response: Response) {}

  public respond(error: InvalidError | ResponseError): void {
    this.response.status(error.statusCode).json(error);
    return;
  }
}
