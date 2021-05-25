import { InvalidError } from '@app/errors';

export class InvalidProfile implements InvalidError {
  public readonly message = 'Profile can\'t be created.';
  public readonly cause = 'Profile shouldn\'t be a nil value';
  public readonly fields = {};
  constructor(fields: string[]) {
    this.fields = fields.reduce((prev, field) => {
      prev[field] = field + ' is required';
      return prev;
    }, {});
  }
}
