import { InvalidError } from '@app/errors';

export class ProfileConflict implements InvalidError {
  public message = 'Conflict!';
  public cause = 'Profile already exists.'
  public statusCode = 409;
}
