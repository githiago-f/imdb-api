import { InvalidError } from '@app/errors';
import { Repository } from 'typeorm';
import { Profile } from '../../entity/Profiles';
import { ProfileDTO } from './dto/ProfileDTO';
import { ProfileConflict } from './errors/ProfileConflict';

export class CreateProfile {
  constructor(
    private repository: Repository<Profile>
  ) {}

  public async execute(profileCreate: Partial<ProfileDTO>): Promise<Profile | InvalidError> {
    const validProfileDTO = ProfileDTO.create(profileCreate);
    if(validProfileDTO instanceof ProfileDTO) {
      const exists = await this.repository.findOne({
        where: {
          email: validProfileDTO.email
        }
      });
      if(exists) {
        return new ProfileConflict();
      }
      await validProfileDTO.encryptPassword();
      return await this.repository.save(validProfileDTO);
    }
    return validProfileDTO;
  }
}
