import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import { ProfileRole } from './value-objects/ProfileRole';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('varchar', { nullable: true })
  token: string;

  @Column('varchar', { length: 355, unique: true })
  email: string;

  @Column('enum', { enum: ProfileRole, default: ProfileRole.USER })
  role: ProfileRole;

  @Column('bool', { default: false })
  excluded: boolean;
}
