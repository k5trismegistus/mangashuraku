import {
  findBook,
  deleteBook,
} from '../repository/booksRepository'

const deleteBookUsecase = async ({ bookId }) => {
  const book = await findBook({ bookId })
  book.deleteImageFiles()
  await deleteBook({ bookId })
  return
}

export default deleteBookUsecase
