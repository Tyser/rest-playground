'use strict';

import path from 'path';
import {createServer} from 'http';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import {json, urlencoded} from 'body-parser';
import swaggerUi from 'swaggerize-ui';
import {errorHandler} from './middleware/errors';
import WaterlineRouter from './lib/waterline-router';
import initModels from './init/models';
import docs from './docs';

const PUBLIC_DIR = path.join(__dirname, 'public');

let app = express();
let server = createServer(app);

let routes = new WaterlineRouter({
  '/people': {
    model: 'person'
  },
  '/people/:personId/pets': {
    model: 'pet',
    parent: {
      param: 'personId',
      key: 'owner'
    }
  },
  '/pets': {
    model: 'pet'
  }
});

app.use(cors());
app.use(compression());
app.get('/api-docs', (req, res) => res.json(docs));
app.use(json());
app.use(urlencoded({extended: true}));
app.use(routes.express());
app.use('/', swaggerUi({docs: '/api-docs'}));
app.use('/app', express.static(PUBLIC_DIR));
app.use(errorHandler);

app.listen(
  process.env.PORT || 8000,
  console.log.bind(console, 'Server Started')
);
