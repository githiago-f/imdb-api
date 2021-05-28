import { InvalidError } from '@app/errors';
import { Repository } from 'typeorm';
import { Profile } from '../../entity/Profile';
import { ProfileNotFound } from './errors/ProfileNotFound';

export class FindProfile {
  constructor(
    private repository: Repository<Profile>
  ) {}

  async execute(id: string, onlyNotExcluded?: boolean): Promise<Profile|InvalidError> {
    const profile = await this.repository
      .findOne(id, onlyNotExcluded ? {} : {
        where: { excluded: false }
      });
    if(!profile) {
      return new ProfileNotFound();
    }
    delete profile['password'];
    return profile;
  }
}
