import { Router } from 'express'
import { Db } from 'mongodb'
import { indexBook, findBook } from '../repository/books_repository';

const PER_PAGE = 20

const bookApiRouter = (db: Db): Router => {
  const router = Router()

  router.get('/', async (req, res) => {
    const params = req.query
    const queryParams = {
      search: (params.q ? params.q : null),
      limit: PER_PAGE,
      offset: PER_PAGE * (params.page ? params.page : 0)
    }
    const result = await indexBook(db, queryParams)
    res.send(result)
  })

  router.get('/:bookId', async (req, res) => {
    const bookId = req.params.bookId

    const result = await findBook(db, { bookId })
    res.send(result)
  })

  return router
}

export { bookApiRouter }
