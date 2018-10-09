require('dotenv').config()

import * as Express from 'express';
import { Db, DbCreateOptions } from 'mongodb'

import { connectDb } from './repository'
import { initApi } from './api'

const app = Express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  next()
})

connectDb().then((db: Db) => {
  initApi(app, db)

  app.listen(
      3001,
      () => {
          console.log('Example app listening on port 3001!');
      });
})


export default app;
