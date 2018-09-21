import { Router } from 'express'
import { Db } from 'mongodb'

import { indexBook, findBook } from '../repository/books_repository';

const bookApiRouter = (db: Db): Router => {
  const router = Router()

  router.get('/', (req, res) => {
    const books = indexBook(db, {}).then((books) => {
      res.send({ books })
    })
  })

  router.get('/:bookId', (req, res) => {
    const bookId = req.params.bookId

    const book = findBook(db, { bookId }).then((book) => {
      res.send({ book })
    })
  })

  return router
}

export { bookApiRouter }
