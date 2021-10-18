import { Request, Router } from 'express'
import * as fileUpload from 'express-fileupload'
import { ImportContext } from '../models/importContext'
import { BooksRepository } from '../repository/booksRepository'
import { ReindexTask } from '../tasks/reindex'

type IndexBookRequest = Request & { query: { page: number }}
type SearchBookRequest = Request & { query: { q: string, page: number }}
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

    const response_data = {
      data: { book: importContext.persistedData }
    }
    res.send(response_data)
  })

  router.get('/', async (req: IndexBookRequest, res) => {
    const page = req.query.page

    const result = await booksRepository.indexBook({ limit: PER_PAGE, offset: (PER_PAGE * (page ? page : 0))})

    const response_data = {
      meta: { total: result.total },
      data: { books: result.books },
    }
    res.send(response_data)
  })

  router.get('/:bookId', async (req: GetBookRequest, res) => {
    const bookId = req.params.bookId
    const book = await booksRepository.findBook({ bookId })
    const response_data = {
      data: { book },
    }

    res.send(response_data)
  })

  // router.get('/search', async (req: SearchBookRequest, res) => {
  //   const searchQuery = req.query.q
  //   const page = req.query.q


  // })


  router.delete('/:bookId', async (req: DeleteBookRequest, res) => {
    const bookId = req.params.bookId

    const book = await booksRepository.findBook({ bookId })
    book.deleteImageFiles()
    await booksRepository.deleteBook({ bookId })

    res.status(204)
  })

  router.post('/reindex', (req, res) => {
    const reindexTask = new ReindexTask({ booksRepository })
    reindexTask.run()

    res.status(204)
  })

  return router
}
