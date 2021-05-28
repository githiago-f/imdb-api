import { InvalidError } from '@app/errors';
import { Repository } from 'typeorm';
import { Profile } from '../../entity/Profile';
import { ProfileDTO } from './dto/ProfileDTO';
import { ProfileConflict } from './errors/ProfileConflict';

export class CreateProfile {
  constructor(
    private repository: Repository<Profile>
  ) {}

  public async execute(profileCreate: Partial<ProfileDTO>): Promise<Profile | InvalidError> {
    const validProfileDTO = ProfileDTO.create(profileCreate);
    if(!(validProfileDTO instanceof ProfileDTO)) {
      return validProfileDTO;
    }
    const exists = await this.repository.findOne({
      where: {
        email: validProfileDTO.email
      }
    });
    if(exists) {
      return new ProfileConflict();
    }
    const profile = await this.repository.save(validProfileDTO.build());
    return profile;
  }
}
