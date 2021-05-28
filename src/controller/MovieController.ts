import { Request, Response, Router } from 'express';
import passport from 'passport';
import { Repository } from 'typeorm';
import { Movie } from '../domain/entity/Movie';
import { Rating } from '../domain/entity/Rating';
import { OnlyAdminsAccessGuard } from '../domain/guard/OnlyAdminsAccessGuard';
import { OnlyUsersAccessGuard } from '../domain/guard/OnlyUsersAccessGuard';
import { CreateMovie } from '../domain/usecases/Movie/CreateMovie';
import { RatingDTO } from '../domain/usecases/Movie/dto/RatingDTO';
import { Valuate } from '../domain/usecases/Movie/Valueate';
import { NotFound } from './errors/NotFound';
import { ErrorHandler } from './utils/ErrorHandler';

export class MovieController {
  private onlyAdminGuard = new OnlyAdminsAccessGuard();
  private onlyUsersGuard = new OnlyUsersAccessGuard();

  constructor(
    private router: Router,
    private moviesRepository: Repository<Movie>,
    private ratingRepository: Repository<Rating>
  ) {
    const middleware = passport.authenticate('jwt', {session:false});
    router.get('/', this.all.bind(this));
    router.post('/', middleware, this.save.bind(this));
    router.get('/:title', this.one.bind(this));
    router.post('/:title/rating', middleware, this.valuate.bind(this));
  }

  get movieRouter(): Router { return this.router; }

  async all(request: Request, response: Response): Promise<void> {
    const movies = await this.moviesRepository.find();
    response.json(movies);
  }

  async save(request: Request, response: Response): Promise<void> {
    const errorHandler = new ErrorHandler(response);
    const notValid = this.onlyAdminGuard.validate(request);

    if(notValid) {
      return errorHandler.respond(notValid);
    }

    const movie = await new CreateMovie(this.moviesRepository)
      .execute(request.body);

    if(!(movie instanceof Movie)) {
      return errorHandler.respond(movie);
    }
    response.status(202).json(movie);
  }

  async one(request: Request, response: Response): Promise<void> {
    const errorHandler = new ErrorHandler(response);
    const {title} = request.params;

    const movie = await this.moviesRepository.createQueryBuilder('movie')
      .leftJoinAndSelect('movie.ratings', 'ratings')
      .where('movie.utitle = :title', { title })
      .getOne();

    if(!movie) {
      return errorHandler.respond(new NotFound('Movie', 'slug'));
    }
    const ratings = movie.ratings.reduce((p,v)=>p+v.range, 0)/movie.ratings.length;
    delete movie.ratings;
    response.json({...movie, ratings});
  }

  async valuate(request: Request, response: Response): Promise<void> {
    const {title} = request.params;
    const errorHandler = new ErrorHandler(response);
    const notValid = this.onlyUsersGuard.validate(request);

    if(notValid) { return errorHandler.respond(notValid); }

    const ratingDTO = RatingDTO.create({
      ...request.body,
      movie: title,
      profile: request.user.id
    });

    if(!(ratingDTO instanceof RatingDTO)) {
      return errorHandler.respond(ratingDTO);
    }

    const newMean = await new Valuate(this.ratingRepository)
      .execute(ratingDTO);

    response.status(202).json({
      newMean
    });
  }
}
