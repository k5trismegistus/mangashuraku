import { indexBook } from '../repository/booksRepository'

const PER_PAGE = 20

const getBooksUsecase = async params => {
  const queryParams = {
    search: params.q ? params.q : null,
    limit: PER_PAGE,
    offset: PER_PAGE * (params.page ? params.page : 0),
  }
  const result = await indexBook(queryParams)

  return {
    meta: { total: result.total },
    data: { books: result.books },
  }
}
export { getBooksUsecase }
