import { InvalidError } from '@app/errors';
import validator from 'validator';
import { Movie } from '../../../entity/Movie';
import { InvalidField } from '../../Profile/dto/errors/InvalidField';

export class MovieDTO {
  constructor(
    public title: string,
    public director: string,
    public genre: string,
    public actors: string[] = []
  ){}

  static create(data: Partial<MovieDTO>): MovieDTO | InvalidError {
    if(!data.title || data.title.length < 1) {
      return new InvalidField('title', 'Should be a valid title');
    }
    if(!data.genre || !validator.isAlphanumeric(data.genre)) {
      return new InvalidField('genre', 'Should have a valid value');
    }
    if(!data.director) {
      return new InvalidField('director', 'This movie should have a director');
    }
    return new MovieDTO(
      data.title,
      data.director,
      data.genre,
      data.actors
    );
  }

  build(): Movie {
    const movie = Object.assign(new Movie(), this);
    return movie;
  }
}
