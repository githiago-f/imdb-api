import { InvalidError } from '@app/errors';

export const InvalidProfile = (): InvalidError => ({
  message: 'Profile can\'t be created.',
  cause: 'Profile shouldn\'t be a nil value'
});
