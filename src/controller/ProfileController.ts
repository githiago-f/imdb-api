import { Repository } from 'typeorm';
import { Router, Response, Request } from 'express';
import { Profile } from '../entity/Profiles';
import { ProfileDTO } from '../dto/ProfileDTO';
import { NotFound } from './errors/NotFound';
import { ProfileRole } from '../entity/value-objects/ProfileRole';

export class ProfileController {
  constructor(private router: Router, private profileRepository: Repository<Profile>) {
    router.get('/', this.all.bind(this));
    router.post('/', this.save.bind(this));
    router.patch('/', this.update.bind(this));
    router.get('/:id', this.one.bind(this));
    router.delete('/:id', this.remove.bind(this));
  }

  public get profileRouter(): Router { return this.router; }

  private async all(request: Request, response: Response): Promise<void> {
    const profiles = await this.profileRepository.find();
    response.json(profiles);
  }

  private async one(request: Request, response: Response): Promise<void> {
    const {id} = request.params;
    try {
      const profile = await this.profileRepository.findOne(id);
      response.json(profile);
      return;
    } catch (e) {
      response.status(404).json(new NotFound('profile', id));
      return;
    }
  }

  private async save(request: Request, response: Response): Promise<void> {
    const dto = ProfileDTO.create(request.body);
    if(dto instanceof ProfileDTO) {
      if(dto.role === ProfileRole.ADMIN) {
        ((request.user as Profile).role === ProfileRole.ADMIN);
      }
      const data = this.profileRepository.save(dto);
      response.status(201).json(data);
      return;
    }
    response.status(422).json(dto);
  }

  private async update(request: Request, response: Response): Promise<void> {
    const {id} = request.params;
    const userToUpdate = await this.profileRepository.findOne(id, {
      where: {
        excluded: false
      }
    });
    if(!userToUpdate) {
      response.status(404).json(new NotFound('profile', id));
      return;
    }
    const data = Object.assign({}, request.body, userToUpdate);
    const profile = ProfileDTO.create(data);
    if(profile instanceof ProfileDTO) {
      const updated = await this.profileRepository.update(userToUpdate, profile);
      response.status(202).json(updated);
    }
    return;
  }

  private async remove(request: Request, response: Response): Promise<void> {
    const {id} = request.params;
    const userToRemove = await this.profileRepository.findOne(id, {
      where: {
        excluded: false
      }
    });
    if(!userToRemove) {
      response.status(404).json(new NotFound('profile', id));
      return;
    }
    await this.profileRepository.update(id, {
      excluded: true
    });
    response.json({
      message: 'Profile deleted!'
    });
    return;
  }
}
