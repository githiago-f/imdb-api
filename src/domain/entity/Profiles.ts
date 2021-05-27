import {
  Entity,
  PrimaryGeneratedColumn,
  Column
} from 'typeorm';
import { ProfileRole } from './value-objects/ProfileRole';
import { compare } from 'bcrypt';
import { ProfileDTO } from '../usecases/Profile/dto/ProfileDTO';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('varchar', { length: 355, unique: true })
  email: string;

  @Column('varchar')
  password: string;

  @Column('enum', { enum: ProfileRole, default: ProfileRole.USER })
  role: ProfileRole;

  @Column('bool', { default: false })
  excluded: boolean;

  public async matchPassword(requestPassword: string): Promise<boolean> {
    return compare(requestPassword, this.password);
  }

  public isAdmin(): boolean {
    return this.role === ProfileRole.ADMIN;
  }

  public toJSON(): Profile {
    const profile = Object.assign({}, this);
    delete profile['password'];
    return profile;
  }
}
