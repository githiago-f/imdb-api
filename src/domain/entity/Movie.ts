import {Entity, Column, BeforeInsert, OneToMany } from 'typeorm';
import { Rating } from './Rating';
import { Slug } from './value-objects/Slug';

@Entity('movies')
export class Movie {
  /**
   * unique title based on title
   */
  @Column({ type: 'varchar', unique: true, primary: true })
  utitle: string;

  @Column()
  title: string;

  @OneToMany(
    () => Rating,
    rating => rating.movie,
    {cascade: true}
  )
  ratings: Rating[];

  @Column()
  genre: string;

  @Column()
  director: string;

  @Column({ type:'varchar', array: true })
  actors: string[];

  @BeforeInsert()
  public async encryptTitle(): Promise<void> {
    this.utitle = new Slug().make(this.title);
  }
}
