import { InvalidError } from '@app/errors';
import validator from 'validator';
import { Movie } from '../../../entity/Movie';
import { Profile } from '../../../entity/Profile';
import { Rating } from '../../../entity/Rating';
import { InvalidField } from '../../Profile/dto/errors/InvalidField';

export class RatingDTO {

  constructor(
    public profile: Profile,
    public movie: Movie,
    public range: number
  ) {}

  static create(ratingDTO: Partial<RatingDTO>): RatingDTO | InvalidError {
    if(!ratingDTO.movie) {
      return new InvalidField('movie', 'Movie not provided!');
    }
    if(!validator.isNumeric(ratingDTO.range.toFixed()) || ratingDTO.range < 0 || ratingDTO.range > 4) {
      return new InvalidField('range', 'Range out of bounds! Should be between 0 and 4');
    }
    return new RatingDTO(
      ratingDTO.profile,
      ratingDTO.movie,
      ratingDTO.range
    );
  }

  build(): Rating {
    const rating = new Rating();
    rating.movie = this.movie;
    rating.profile = this.profile;
    rating.range = this.range;
    return rating;
  }
}
