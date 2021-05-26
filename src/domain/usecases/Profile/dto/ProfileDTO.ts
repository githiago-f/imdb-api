import { InvalidError } from '@app/errors';
import { without } from 'lodash';
import validator from 'validator';
import { ProfileRole } from '../../../entity/value-objects/ProfileRole';
import { InvalidProfile } from './errors/InvalidProfile';
import { InvalidField } from './errors/InvalidField';
import { genSalt, hash } from 'bcrypt';

export class ProfileDTO {
  public readonly name: string;
  public readonly email: string;
  public readonly role: ProfileRole;
  public password: string;

  private static requiredFields = ['name', 'password', 'email'];

  private constructor(data: Partial<ProfileDTO>) {
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role || ProfileRole.USER;
  }

  async encryptPassword(): Promise<void> {
    this.password = await hash(this.password, await genSalt(10));
  }

  private static notValid(data: Partial<ProfileDTO>): void|InvalidError {
    if(data.email && !validator.isEmail(data.email)) {
      return new InvalidField('email', data.email + 'is not an email');
    }
    if(data.name && !validator.isAlphanumeric(data.name, 'pt-BR')){
      return new InvalidField('name', 'Name should not contain non-alphanumeric values');
    }
  }

  static create(data: Partial<ProfileDTO>): ProfileDTO | InvalidError {
    const fields = without(ProfileDTO.requiredFields, ...Object.keys(data));
    if(fields.length>0) {
      return new InvalidProfile(fields);
    }
    const notValid = this.notValid(data);
    if(notValid){
      return notValid;
    }
    return new ProfileDTO(data);
  }

  static update(data: Partial<ProfileDTO>): ProfileDTO | InvalidError {
    const notValid = this.notValid(data);
    if(notValid) {
      return notValid;
    }
    return new ProfileDTO(data);
  }
}
