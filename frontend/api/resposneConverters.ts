import {
  BookSummary,
  Book,
} from '../models'

export const convertBooksIndex = (response): Array<BookSummary> => {
  return response.data.data.books.map(e => {
    const createdAt = new Date(e.createdAt)
    return new BookSummary({
      createdAt,
      ...e
    })
  })
}

export const convertBook = (response): Book => {
  const book = response.data.data.book
  const createdAt = new Date(book.createdAt)
  return new Book({
    createdAt,
    ...book
  })
}
