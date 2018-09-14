require('dotenv').config()

import * as Express from 'express';
import { Db, DbCreateOptions } from 'mongodb'

import { connectDb } from './repository'
import { initApi } from './api'

const app = Express();

connectDb().then((db: Db) => {
  initApi(app, db)

  app.listen(
      3001,
      () => {
          console.log('Example app listening on port 3001!');
      });
})


export default app;
