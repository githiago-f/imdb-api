import { InvalidError } from '@app/errors';

export class ProfileNotFound implements InvalidError {
  message = 'Profile not found!';
  cause = 'Profile can be deleted or doesn\'t exists';
  statusCode = 404;
}
