import { Express, Router } from 'express';

import { healthApiRouter } from './healthApi'

const apiRouter = Router()

apiRouter.use('/health', healthApiRouter)

const initApi = (app: Express) => {
  app.use('/api', apiRouter)
}

export { initApi }
