import multer from 'multer';
import { Router } from 'express';
import multerConfig from './config/multer';
import authToken from './app/middlewares/token';
import UserController from './app/controllers/UserController';
import FileController from './app/controllers/FileController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authToken);

routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
