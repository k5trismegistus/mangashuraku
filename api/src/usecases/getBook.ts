import { findBook } from '../repository/booksRepository'

const getBookUsecase = async ({ bookId }) => {
  const book = await findBook({ bookId })
  return {
    data: { book },
  }
}

export { getBookUsecase }
