import 'reflect-metadata';
import { createConnection, getRepository} from 'typeorm';
import express, {Router} from 'express';
import { Profile } from './entity/Profiles';
import { ProfileController } from './controller/ProfileController';

createConnection().then(async () => {
  const port = process.env.PORT || 8080;

  const app = express();
  app.use(express.json());

  const profilesRepository = getRepository(Profile);
  const profileController = new ProfileController(Router(), profilesRepository);

  app.use('/users', profileController.profileRouter);

  app.listen(port, async () => {
    console.log(`Listening at ${port}`);
  });
}).catch(error => console.log(error));
