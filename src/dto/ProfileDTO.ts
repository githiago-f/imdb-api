import { InvalidError } from '@app/errors';
import { without } from 'lodash';
import { ProfileRole } from '../entity/value-objects/ProfileRole';
import { InvalidProfile } from './errors/InvalidProfile';

export class ProfileDTO {
  public readonly name: string;
  public readonly password: string;
  public readonly email: string;
  public readonly role: ProfileRole;

  private static requiredFields = ['name', 'password', 'email'];

  private constructor(data: Partial<ProfileDTO>) {
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role || ProfileRole.USER;
  }

  static create(data: Partial<ProfileDTO>): ProfileDTO | InvalidError {
    const fields = without(ProfileDTO.requiredFields, ...Object.keys(data));
    if(fields.length>0) {
      return new InvalidProfile(fields);
    }
    return new ProfileDTO(data);
  }
}
