import { InvalidError } from '@app/errors';

export class InvalidProfile implements InvalidError {
  public readonly message = 'Profile can\'t be created.';
  public readonly cause = 'Profile should have the following fields';
  public readonly fields = {};
  public readonly statusCode = 422;

  constructor(fields: string[]) {
    this.fields = fields.reduce((prev, field) => {
      prev[field] = field + ' is required';
      return prev;
    }, {});
  }
}
