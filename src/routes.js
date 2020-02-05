import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authToken from './app/middlewares/token';

const routes = new Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.use(authToken);

routes.put('/users', UserController.update);

routes.post('/sessions', SessionController.store);

export default routes;
