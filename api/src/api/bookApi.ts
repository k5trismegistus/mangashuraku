import { Request, Router } from 'express'
import * as fileUpload from 'express-fileupload'
import { ImportContext } from '../models/importContext'
import { BooksRepository } from '../repository/booksRepository'
import { ReindexTask } from '../tasks/reindex'

type SearchBookRequest = Request & { query: { q: string, page: string }}
type GetBookRequest = Request & { params: { bookId: string }}
type DeleteBookRequest = Request & { params: { bookId: string }}

const PER_PAGE = 20

export const BooksApiRouter = (booksRepository: BooksRepository) => {
  const router = Router()
  router.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/app/tmp/',
    preserveExtension: true
  }))

  router.post('/', async (req, res) => {

    const f = (Array.isArray(req.files.f)) ? req.files.f[0] : req.files.f

    const importContext = new ImportContext({
      filename: f.name,
      tempFilePath: f.tempFilePath,
      booksRepository: booksRepository,
    })

    await importContext.import()
    await booksRepository.index(importContext.persistedData)

    const response_data = {
      data: { book: importContext.persistedData }
    }
    res.send(response_data)
  })

  router.get('/', async (req: SearchBookRequest, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1
    const searchQuery = req.query.q

    let responseData
    if (searchQuery) {
      const from = (page - 1) * PER_PAGE

      const { total, books} = await booksRepository.searchBook({
        searchQuery, perPage: PER_PAGE, from,
      })

      responseData = {
        meta: { total },
        data: { books }
      }
    } else {
      const result = await booksRepository.indexBook({
        limit: PER_PAGE, offset: (page - 1) * PER_PAGE
      })

      responseData = {
        meta: { total: result.total },
        data: { books: result.books },
      }
    }

    res.send(responseData)
  })

  router.post('/reindex', (req, res) => {
    const reindexTask = new ReindexTask({ booksRepository })
    reindexTask.run()

    res.status(204)
  })

  router.get('/:bookId', async (req: GetBookRequest, res) => {
    const bookId = req.params.bookId
    const book = await booksRepository.findBook({ bookId })
    const response_data = {
      data: { book },
    }

    res.send(response_data)
  })

  router.delete('/:bookId', async (req: DeleteBookRequest, res) => {
    const bookId = req.params.bookId

    const book = await booksRepository.findBook({ bookId })
    book.deleteImageFiles()
    await booksRepository.deleteBook({ bookId })

    res.status(204)
  })

  return router
}
