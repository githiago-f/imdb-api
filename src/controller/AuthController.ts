import { Request, Router, Response } from 'express';
import { Repository } from 'typeorm';
import { Profile } from '../domain/entity/Profile';
import { Login } from '../domain/usecases/Profile/Login';
import { JwtDTO } from './dto/JwtDTO';


export class AuthController {
  constructor(
    private router: Router,
    private repository: Repository<Profile>) {
    router.post('/login', this.login.bind(this));
    router.get('/logout', this.logout.bind(this));
  }

  get loginRouter() : Router {
    return this.router;
  }

  async login(request: Request, response: Response): Promise<void> {
    const {email, password} = request.body;
    const profile = await new Login(this.repository).execute(email, password);
    if(profile instanceof Profile) {
      request.logIn(profile, {session:false}, (err: Error) => {
        if(err) {
          response.status(500).json(err);
          return;
        }
        const jwt = new JwtDTO(profile);
        response.setHeader('Authorization', `Bearer ${jwt.token}`);
        response.status(202).json(jwt);
      });
      return;
    }
    response.status(profile.statusCode).json(profile);
  }

  async logout(request: Request, response: Response): Promise<void> {
    request.logout();
    response.redirect('/');
  }
}
