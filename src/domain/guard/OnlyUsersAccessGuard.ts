import { Request } from 'express';
import { InvalidError } from '@app/errors';
import { IGuard } from '@app/gurds';
import { Forbidden } from './errors/Forbidden';

export class OnlyUsersAccessGuard implements IGuard {
  public validate(request: Request): InvalidError | null {
    if(!request.user) {
      return new Forbidden();
    }
  }
}
