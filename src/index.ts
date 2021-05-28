import 'reflect-metadata';
import { createConnection, getRepository } from 'typeorm';
import express, { Router } from 'express';
import { ProfileController } from './controller/ProfileController';
import { Profile } from './domain/entity/Profile';
import { AuthController } from './controller/AuthController';
import { Movie } from './domain/entity/Movie';
import { MovieController } from './controller/MovieController';
import { setupPassport } from './config/setupPassport';
import { Rating } from './domain/entity/Rating';

createConnection().then(async () => {
  const port = process.env.PORT || 8080;

  const app = express();
  app.use(express.json());

  const profilesRepository = getRepository(Profile);
  const movieRepository = getRepository(Movie);
  const ratingRepository = getRepository(Rating);

  setupPassport(profilesRepository);

  const authController = new AuthController(Router(), profilesRepository);
  const profileController = new ProfileController(Router(), profilesRepository);
  const movieController = new MovieController(Router(), movieRepository, ratingRepository);

  app.use(authController.loginRouter);

  app.use('/users', profileController.profileRouter);
  app.use('/movies', movieController.movieRouter);

  app.listen(port, async () => {
    console.log(`Listening at ${port}`);
  });
}).catch(error => console.log(error));
