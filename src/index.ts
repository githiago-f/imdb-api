import 'reflect-metadata';
import { createConnection, getRepository} from 'typeorm';
import express, {NextFunction, Request, Response, Router} from 'express';
import { ProfileController } from './controller/ProfileController';
import { Profile } from './domain/entity/Profiles';
import { AuthController } from './controller/AuthController';
import { Movie } from './domain/entity/Movies';
import { MovieController } from './controller/MovieController';
import { setupPassport } from './config/setupPassport';

createConnection().then(async () => {
  const port = process.env.PORT || 8080;

  const app = express();
  app.use(express.json());

  const profilesRepository = getRepository(Profile);
  const movieRepository = getRepository(Movie);

  setupPassport(profilesRepository);

  const authController = new AuthController(Router(), profilesRepository);
  const profileController = new ProfileController(Router(), profilesRepository);
  const movieController = new MovieController(Router(), movieRepository);

  app.use(authController.loginRouter);

  app.use('/users', profileController.profileRouter);
  app.use('/movies', movieController.movieRouter);

  app.use((err: Error, _req: Request, res: Response, _: NextFunction) => {
    res.status(500).json({message: err.message});
  });

  app.listen(port, async () => {
    console.log(`Listening at ${port}`);
  });
}).catch(error => console.log(error));
