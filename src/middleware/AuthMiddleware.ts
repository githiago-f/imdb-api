import { Repository } from 'typeorm';
import { Profile } from '../domain/entity/Profiles';

export class AuthMiddleware {
  constructor(private repository: Repository<Profile>) {}

  login(username: string) {
    // TODO
  }
}
