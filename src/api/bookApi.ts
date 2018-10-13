import { Router } from 'express'
import {
  getBooks,
  getBook,
  deleteBook,
} from '../usecases'

const bookApiRouter = Router()

bookApiRouter.get('/', async (req, res) => {
  const params = req.query
  const result = await getBooks(params)
  res.send(result)
})

bookApiRouter.get('/:bookId', async (req, res) => {
  const bookId = req.params.bookId
  const result = await getBook({ bookId })
  res.send(result)
})

bookApiRouter.delete('/:bookId', async (req, res) => {
  const bookId = req.params.bookId
  await deleteBook({ bookId })
  res.status(204)
})

export { bookApiRouter }
