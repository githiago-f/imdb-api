import { InvalidError } from '@app/errors';
import { isNil } from 'lodash';
import { ProfileRole } from '../entity/value-objects/ProfileRole';
import { InvalidProfile } from './errors/InvalidProfile';

export class ProfileDTO {
  private constructor(
    public readonly name: string,
    public readonly password: string,
    public readonly email: string,
    public readonly role: ProfileRole
  ) {}

  static create(data: Partial<ProfileDTO>): ProfileDTO | InvalidError {
    if(isNil(data)) {
      return InvalidProfile();
    }

  }
}
