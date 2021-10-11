import { Request, Router } from 'express'
import { UploadedFile } from 'express-fileupload'
import * as fileUpload from 'express-fileupload'

type IndexBookRequest = Request & { query: { page: number }}
type GetBookRequest = Request & { params: { bookId: string }}
type DeleteBookRequest = Request & { params: { bookId: string }}

export const BooksApiRouter = (booksRepository) => {
  const router = Router()
  router.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
  }))

  router.post('/', async (req, res) => {

    const f = (Array.isArray(req.files.f)) ? req.files.f[0] : req.files.f

    const response_data = {
      filename: f.name
    }
    res.send(response_data)
  })

  router.get('/', async (req: IndexBookRequest, res) => {
    const PER_PAGE = 20
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


  router.delete('/:bookId', async (req: DeleteBookRequest, res) => {
    const bookId = req.params.bookId

    const book = await booksRepository.findBook({ bookId })
    book.deleteImageFiles()
    await booksRepository.deleteBook({ bookId })

    res.status(204)
  })

  return router
}
