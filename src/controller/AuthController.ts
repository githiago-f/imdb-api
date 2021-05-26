import { Request, Router, Response } from 'express';
import { Repository } from 'typeorm';
import { Profile } from '../domain/entity/Profiles';
import { Login } from '../domain/usecases/Profile/Login';

export class AuthController {
  constructor(private router: Router,
    private repository: Repository<Profile>) {
    router.post('/login', this.login.bind(this));
    router.get('/logout', this.logout.bind(this));
  }

  get loginRouter() : Router {
    return this.router;
  }

  async login(request: Request, response: Response): Promise<void> {
    const {email, password} = request.body;
    const user = await new Login(this.repository).execute(email, password);
    if(user instanceof Profile) {
      response.json(user);
      return;
    }
    response.status(user.statusCode).json(user);
  }

  async logout(request: Request, response: Response): Promise<void> {
    request.logout();
    response.redirect('/');
  }
}
