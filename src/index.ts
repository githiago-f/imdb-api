import 'reflect-metadata';
import { createConnection, getRepository} from 'typeorm';
import express, {Request, Response, Router} from 'express';
import { ProfileController } from './controller/ProfileController';
import { Profile } from './domain/entity/Profiles';
import { AuthController } from './controller/AuthController';

createConnection().then(async () => {
  const port = process.env.PORT || 8080;

  const app = express();
  app.use(express.json());

  const profilesRepository = getRepository(Profile);
  const profileController = new ProfileController(Router(), profilesRepository);
  const authController = new AuthController(Router(), profilesRepository);

  app.use(authController.loginRouter);

  /// use authenticate

  app.use('/users', profileController.profileRouter);

  app.use((err: Error, req: Request, res: Response, _) => {
    res.status(500).json({message: err.message});
  });

  app.listen(port, async () => {
    console.log(`Listening at ${port}`);
  });
}).catch(error => console.log(error));
