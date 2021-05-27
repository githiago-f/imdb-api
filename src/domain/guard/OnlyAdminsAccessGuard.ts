import { Request } from 'express';
import { InvalidError } from '@app/errors';
import { IGuard } from '@app/gurds';
import { Forbidden } from './errors/Forbidden';

export class OnlyAdminsAccessGuard implements IGuard {
  public validate(request: Request): InvalidError | null {
    if(!request.user || !request.user.isAdmin()) {
      return new Forbidden();
    }
  }
}
