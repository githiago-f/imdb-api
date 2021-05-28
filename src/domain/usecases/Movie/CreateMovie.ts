import { InvalidError } from '@app/errors';
import { Repository } from 'typeorm';
import { Movie } from '../../entity/Movie';
import { Slug } from '../../entity/value-objects/Slug';
import { MovieDTO } from './dto/MovieDTO';
import { MovieConfilct } from './errors/MovieConflict';

export class CreateMovie {
  constructor(private repository: Repository<Movie>) {}

  public async execute(movie: Partial<MovieDTO>): Promise<Movie|InvalidError> {
    const movieDTO = MovieDTO.create(movie);
    if(!(movieDTO instanceof MovieDTO)) {
      return movieDTO;
    }
    const slug = new Slug().make(movieDTO.title);
    const exists = await this.repository.find({ where: { utitle: slug }});

    if(exists.length>0) {
      return new MovieConfilct();
    }

    return await this.repository.save(movieDTO.build());
  }
}
