import { BookSummary } from '../models/bookSummary'

export const convertBooksIndex = (response): Array<BookSummary> => {
  return response.data.data.books.map(e => {
    const createdAt = new Date(e.createdAt)
    return new BookSummary({
      createdAt,
      ...e
    })
  })
}
