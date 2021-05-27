import jwt from 'jsonwebtoken';
import { Constants } from '../../config/constants';
import { Profile } from '../../domain/entity/Profiles';

export class JwtDTO {
  public token: string;
  constructor(profile: Profile) {
    this.token = jwt.sign({
      user: {
        id: profile.id,
        email: profile.email
      }
    }, Constants.JWT_SECRETS);
  }
}
