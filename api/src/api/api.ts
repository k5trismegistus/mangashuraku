import { Router } from 'express'
import { HealthApiRouter } from './healthApi'
import { BooksApiRouter } from './bookApi'

export const ApiRouter = (repositories) => {
  const router = Router()
  router.use('/health', HealthApiRouter({}))
  router.use('/books', BooksApiRouter(repositories.booksRepository))

  return router
}
