import { Express, Router } from 'express'
import { healthApiRouter } from './healthApi'
import { bookApiRouter } from './bookApi'

const apiRouter = Router()
apiRouter.use('/health', healthApiRouter)
// apiRouter.use('/books', bookApiRouter)

const initApi = (app: Express) => {
  app.use('/api', apiRouter)
}

export { initApi }
