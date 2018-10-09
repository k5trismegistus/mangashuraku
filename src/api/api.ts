import { Express, Router } from 'express'
import { Db } from 'mongodb'

import { healthApiRouter } from './healthApi'
import { bookApiRouter } from './bookApi'

const apiRouter = db => {
  const router = Router()
  router.use('/health', healthApiRouter(db))
  router.use('/books', bookApiRouter(db))

  return router
}

const initApi = (app: Express, db: Db) => {
  app.use('/api', apiRouter(db))
}

export { initApi }
