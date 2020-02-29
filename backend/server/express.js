import _ from 'lodash';
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';

import logger from './logger';
import initRoutes from '../app/routes';
import Responder from './expressResponder';

const app = express();

function initMiddleware() {
  app.set('showStackError', true);
  app.enable('jsonp callback');
  app.use(morgan('combined', _.pick(logger, 'stream')));

  switch (process.env.NODE_ENV) {
    case 'development':
      break;
    case 'production':
      app.locals.cache = 'memory';
      break;
  }

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(methodOverride());
  app.use(cors());
}

function initPingURL() {
  app.get('/_ping', (req, res) => {
    Responder.success(res, {result: 'Ping Received!!!'});
  });
}

function catchNotFound() {
  app.use(Responder.notFound);
}

function catchErrorRoutes() {
  app.use((err, req, res, next) => {
    if (!err) return next();
    return Responder.operationFailed(res, err);
  });
}

function init() {

  // Initialize Middlewares
  initMiddleware();

  // Initialize Ping URL
  initPingURL();

  // Initialize API Routes
  initRoutes(app);

  // Initialize Not Found Route
  catchNotFound();

  // Initialize Error Routes
  catchErrorRoutes();

  return app;
}

module.exports.init = init;
