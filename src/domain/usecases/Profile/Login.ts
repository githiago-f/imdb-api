import { InvalidError } from '@app/errors';
import { isNil } from 'lodash';
import { Repository } from 'typeorm';
import validator from 'validator';
import { Profile } from '../../entity/Profiles';
import { InvalidField } from './dto/errors/InvalidField';

export class Login {
  constructor(
    private repository: Repository<Profile>
  ) {}

  private notValid(email: string): void | InvalidError {
    if(isNil(email) || !validator.isEmail(email)) {
      return new InvalidField('email', 'Is not a valid email!');
    }
  }

  async execute(email: string, password: string): Promise<Profile | InvalidError> {
    const notValid = this.notValid(email);
    if(notValid) {
      return notValid;
    }

    const profile = await this.repository.findOne({
      where: {
        email: email,
        excluded: false
      }
    });

    if(!profile) {
      return new InvalidField('email/password', 'Invalid email or password!');
    }
    if(!await profile.matchPassword(password)) {
      return new InvalidField('email/password', 'Invalid email or password!');
    }
    delete profile.password;
    return profile;
  }
}
