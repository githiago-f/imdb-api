import { InvalidError } from '@app/errors';

export class Forbidden implements InvalidError {
  message = 'Forbidden access!';
  cause = 'You have no permission to access this resource.'
  statusCode = 403;
}
