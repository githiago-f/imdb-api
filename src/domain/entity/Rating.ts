import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  OneToOne
} from 'typeorm';
import { Movie } from './Movie';
import { Profile } from './Profile';
import { Slug } from './value-objects/Slug';

@Entity('ratings')
export class Rating {
  @Column({ type: 'varchar', primary: true, unique: true })
  public id: string;

  @Column({type: 'uuid'})
  @OneToOne(() => Profile)
  public profile: Profile;

  @Column({type: 'varchar'})
  @ManyToOne(
    () => Movie,
    movie => movie.ratings,
    {eager: true}
  )
  public movie: Movie;

  @Column({ type: 'int' })
  public range: number;

  @BeforeInsert()
  public async uniqueKey(): Promise<void> {
    const key = this.profile + '_' + this.movie;
    this.id = new Slug().make(key);
  }
}
