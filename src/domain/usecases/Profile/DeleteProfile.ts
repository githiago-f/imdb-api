import { InvalidError } from '@app/errors';
import { Repository } from 'typeorm';
import { Profile } from '../../entity/Profile';
import { ProfileNotFound } from './errors/ProfileNotFound';

export class DeleteMessage {
  public readonly message = 'Profile deleted successfuly!';
}

export class DeleteProfile {
  constructor(
    private repository: Repository<Profile>
  ) {}

  async execute(id: string): Promise<InvalidError|DeleteMessage> {
    const userToRemove = await this.repository.findOne(id, {
      where: {
        excluded: false
      }
    });
    if(!userToRemove) {
      return new ProfileNotFound();
    }
    await this.repository.update(id, { excluded: true });
    return new DeleteMessage();
  }
}
