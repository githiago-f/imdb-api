import passport from 'passport';
import Jwt from 'passport-jwt';
import { Repository } from 'typeorm';
import { Profile } from '../domain/entity/Profile';
import { FindProfile } from '../domain/usecases/Profile/FindProfile';
import { Constants } from './constants';

export const setupPassport = (profileRepository: Repository<Profile>): void => {
  const options = {
    jwtFromRequest: Jwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: Constants.JWT_SECRETS
  } as Jwt.StrategyOptions;

  passport.use('jwt', new Jwt.Strategy(options, async (payload, done) => {
    const profile = await new FindProfile(profileRepository)
      .execute(payload.user.id, true);
    if(profile instanceof Profile) {
      return done(null, profile);
    }
    return done(null, null);
  }));
};

