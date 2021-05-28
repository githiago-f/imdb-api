import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert
} from 'typeorm';
import { ProfileRole } from './value-objects/ProfileRole';
import { compare, genSalt, hash } from 'bcrypt';

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

  @BeforeInsert()
  public async beforeInsert(): Promise<void> {
    this.password = await hash(this.password, await genSalt(10));
  }
}
