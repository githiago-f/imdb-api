import { Request, Response, Router } from 'express';
import passport from 'passport';
import { Repository } from 'typeorm';
import { Movie } from '../domain/entity/Movies';
import { OnlyAdminsAccessGuard } from '../domain/guard/OnlyAdminsAccessGuard';
import { OnlyUsersAccessGuard } from '../domain/guard/OnlyUsersAccessGuard';

export class MovieController {
  private onlyAdminGuard = new OnlyAdminsAccessGuard();
  private allUsersGuard = new OnlyUsersAccessGuard();

  constructor(private router: Router, private moviesRepository: Repository<Movie>) {
    const middleware = passport.authenticate('jwt', {session:false});
    router.get('/', this.all.bind(this));
    router.post('/', middleware, this.save.bind(this));
    // router.get('/', this.all.bind(this));
    // router.get('/', this.all.bind(this));
  }

  get movieRouter(): Router {
    return this.router;
  }

  all(request: Request, response: Response): void {
    response.json({
      user: request.user
    });
  }

  save(request: Request, response: Response): void {
    const valid = this.onlyAdminGuard.validate(request);
    if(valid) {
      response.status(valid.statusCode)
        .json(valid);
      return;
    }
  }

  one(): void {
    // todo
  }

  valuate(request: Request, response: Response): void {
    const valid = this.allUsersGuard.validate(request);
    if(valid) {
      response.status(valid.statusCode)
        .json(valid);
      return;
    }
    return;
  }
}
