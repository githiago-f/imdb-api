import { Repository } from 'typeorm';
import { Movie } from '../../entity/Movie';
import { Rating } from '../../entity/Rating';
import { Slug } from '../../entity/value-objects/Slug';
import { RatingDTO } from './dto/RatingDTO';

export class Valuate {
  constructor(
    private repository: Repository<Rating>
  ) {}

  private async getAverage(movie: Movie) {
    const movieRating = await this.repository.find({
      select: ['range'],
      where: { movie }
    });
    return Math.ceil(
      movieRating.reduce(
        (prev,value) => prev + value.range, 0
      ) / movieRating.length
    );
  }

  public async execute(dto: RatingDTO): Promise<number> {
    const rating = dto.build();

    rating.id = new Slug().make(dto.profile+'_'+dto.movie);

    await this.repository.createQueryBuilder()
      .insert()
      .values(rating)
      .onConflict('(id) DO UPDATE SET range = excluded.range')
      .execute();

    return await this.getAverage(dto.movie);
  }
}
