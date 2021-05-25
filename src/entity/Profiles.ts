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

  @Column('bool', { default: false })
  excluded: boolean;

  @Column('enum', {
    enum: ProfileRole,
    default: ProfileRole.USER
  })
  role: ProfileRole;
}
