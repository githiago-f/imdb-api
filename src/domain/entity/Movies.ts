import { hash } from 'bcrypt';
import {Entity, Column, BeforeInsert} from 'typeorm';

@Entity('movies')
export class Movie {
  /**
   * unique title based on title
   */
  @Column({ unique: true, primary: true })
  utitle: string;

  @Column()
  title: string;

  @BeforeInsert()
  public async encryptTitle(): Promise<void> {
    this.utitle = await hash(this.title, 1);
  }

  constructor(title: string) {
    this.title = title;
  }

  static create(data) {
    return new Movie(data.title);
  }
}
