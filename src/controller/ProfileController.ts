import { Repository } from 'typeorm';
import { Request, Router, Response } from 'express';
import { Profile } from '../entity/Profiles';

export class ProfileController {
  constructor(private router: Router, private profileRepository: Repository<Profile>) {
    router.get('/', this.all.bind(this));
    router.post('/', this.save.bind(this));
    router.get('/:id', this.one.bind(this));
    router.delete('/', this.remove.bind(this));
  }

  public get profileRouter(): Router { return this.router; }

  private async all(request: Request, response: Response): Promise<void> {
    const profiles = await this.profileRepository.find();
    response.json(profiles);
  }

  private async one(request: Request, response: Response): Promise<void> {
    const profile = await this.profileRepository.findOne(request.params.id);
    response.json(profile);
  }

  private async save(request: Request): Promise<void> {
    this.profileRepository.save(request.body);
  }

  private async remove(request: Request, response: Response): Promise<void> {
    const userToRemove = await this.profileRepository.findOne(request.params.id);
    if(!userToRemove || userToRemove.excluded) {
      response.status(404).json({
        message: 'Profile not found!'
      });
      return;
    }
    this.profileRepository.update(request.params.id, {
      excluded: true
    });
    response.json({
      message: 'Profile desactivated!'
    });
  }
}
