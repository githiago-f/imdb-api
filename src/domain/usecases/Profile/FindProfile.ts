import { InvalidError } from '@app/errors';
import { Repository } from 'typeorm';
import { Profile } from '../../entity/Profiles';
import { ProfileNotFound } from './errors/ProfileNotFound';

export class FindProfile {
  constructor(
    private repository: Repository<Profile>
  ) {}

  async execute(id: string, excluded?: boolean): Promise<Profile|InvalidError> {
    const profile = await this.repository.findOne(id, excluded ? {} : {
      where: { excluded }
    });
    if(!profile) {
      return new ProfileNotFound();
    }
    return profile;
  }
}
