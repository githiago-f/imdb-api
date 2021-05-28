import { Repository } from 'typeorm';
import { Router, Response, Request } from 'express';
import { NotFound } from './errors/NotFound';
import { Profile } from '../domain/entity/Profile';
import { CreateProfile } from '../domain/usecases/Profile/CreateProfile';
import { UpdateProfile } from '../domain/usecases/Profile/UpdateProfile';
import { DeleteMessage, DeleteProfile } from '../domain/usecases/Profile/DeleteProfile';
import { FindProfile } from '../domain/usecases/Profile/FindProfile';
import passport from 'passport';
import { Forbidden } from '../domain/guard/errors/Forbidden';
import { ErrorHandler } from './utils/ErrorHandler';

export class ProfileController {
  constructor(
    private router: Router,
    private profileRepository: Repository<Profile>
  ) {
    const middleware = passport.authenticate('jwt', {session: false});

    router.get('/', this.all.bind(this));
    router.post('/', this.save.bind(this));
    router.patch('/:id', this.update.bind(this));
    router.get('/profile', middleware, this.profile.bind(this));
    router.delete('/:id', this.remove.bind(this));
  }

  public get profileRouter(): Router { return this.router; }

  private async all(request: Request, response: Response): Promise<void> {
    const profiles = await this.profileRepository.find();
    response.json(profiles);
  }

  private async profile(request: Request, response: Response): Promise<void> {
    if(!request.user) {
      const error = new Forbidden();
      response.status(error.statusCode).json(error);
      return;
    }
    const result = await new FindProfile(this.profileRepository)
      .execute(request.user.id);
    if(result instanceof Profile) {
      response.json(result);
      return;
    }
    response.status(result.statusCode).json(result);
  }

  private async save(request: Request, response: Response): Promise<void> {
    const create = await new CreateProfile(this.profileRepository)
      .execute(request.body);
    if(create instanceof Profile) {
      response.status(201).json(create);
      return;
    }
    response.status(create.statusCode||500).json(create);
  }

  private async update(request: Request, response: Response): Promise<void> {
    const {id} = request.params;
    const userToUpdate = await this.profileRepository.findOne(id);
    if(!userToUpdate) {
      response.status(404).json(new NotFound('profile', id));
      return;
    }
    const updated = await new UpdateProfile(this.profileRepository)
      .execute(id, request.body);
    response.status(202).json(updated);
    return;
  }

  private async remove(request: Request, response: Response): Promise<void> {
    const errorHandler = new ErrorHandler(response);
    const {id} = request.params;
    const deleted = await new DeleteProfile(this.profileRepository).execute(id);
    if(deleted instanceof DeleteMessage) {
      response.json(deleted);
      return;
    }
    return errorHandler.respond(deleted);
  }
}
