import { InvalidError } from '@app/errors';
import { Repository, UpdateResult } from 'typeorm';
import { Profile } from '../../entity/Profiles';
import { ProfileDTO } from './dto/ProfileDTO';

export class UpdateProfile {
  constructor(
    private repository: Repository<Profile>
  ) {}

  async execute(id: string, profileDto: Partial<ProfileDTO>): Promise<UpdateResult |InvalidError> {
    const profile = ProfileDTO.update(profileDto);
    if(profile instanceof ProfileDTO) {
      const updated = await this.repository.update(id, profile);
      return updated;
    }
    return profile;
  }
}
