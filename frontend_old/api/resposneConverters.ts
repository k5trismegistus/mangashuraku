import {
  BookSummary,
  Book,
} from '../models'

export const convertBooksIndex = (response) => {
  const total = response.data.meta.total
  const books =  response.data.data.books.map(e => {
    const createdAt = new Date(e.createdAt)
    return new BookSummary({
      createdAt,
      ...e
    })
  })

  return { total, books }
}

export const convertBook = (response): Book => {
  const book = response.data.data.book
  const createdAt = new Date(book.createdAt)
  return new Book({
    createdAt,
    ...book
  })
}
