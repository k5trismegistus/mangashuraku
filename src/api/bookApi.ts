import { Router } from 'express'
import { getBooksUsecase, getBookUsecase, deleteBookUsecase } from '../usecases'

const bookApiRouter = Router()

bookApiRouter.get('/', async (req, res) => {
  const params = req.query
  const result = await getBooksUsecase(params)
  res.send(result)
})

bookApiRouter.get('/:bookId', async (req, res) => {
  const bookId = req.params.bookId
  const result = await getBookUsecase({ bookId })
  res.send(result)
})

bookApiRouter.delete('/:bookId', async (req, res) => {
  const bookId = req.params.bookId
  await deleteBookUsecase({ bookId })
  res.status(204)
})

export { bookApiRouter }
