import { InvalidError } from '@app/errors';

export class MovieConfilct implements InvalidError {
  public message = 'Conflict!';
  public cause = 'Movie already exists.'
  public statusCode = 409;
}
