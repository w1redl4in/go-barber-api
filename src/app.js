import express from 'express';
import 'express-async-errors';
import Youch from 'youch';
import path from 'path';
import * as Sentry from '@sentry/node';
import sentryConfig from './config/Sentry';
import routes from './routes';
import './database';

class App {
  constructor() {
    this.server = express();
    Sentry.init(sentryConfig);
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (error, req, res, next) => {
      const errors = await new Youch(error, req).toJSON();
      return res.status(500).json(errors);
    });
  }
}

export default new App().server;
