import { InvalidError } from '@app/errors';

export class InvalidCredentials implements InvalidError {
  message = 'Invalid credentials!'
  cause = 'E-mail or password are invalid!'
  statusCode = 401;
  fields = {
    password: 'Invalid Password',
    email: 'Invalid E-mail'
  }
}
