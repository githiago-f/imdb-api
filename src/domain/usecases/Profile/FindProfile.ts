import { Repository } from 'typeorm';
import { Profile } from '../../entity/Profiles';

export class FindProfile {
  constructor(
    private repository: Repository<Profile>
  ) {}

  async execute(id: string, excluded?: boolean): Promise<Profile|null> {
    return this.repository.findOne(id, excluded ? {} : {
      where: { excluded }
    });
  }
}
