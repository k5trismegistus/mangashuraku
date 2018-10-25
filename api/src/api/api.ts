import { Express, Router } from 'express'
import { healthApiRouter } from './healthApi'
import { bookApiRouter } from './bookApi'

const initApi = (app: Express) => {
  const apiRouter = Router()
  apiRouter.use('/health', healthApiRouter)
  apiRouter.use('/books', bookApiRouter)
  app.use('/api', apiRouter)
}

export { initApi }
