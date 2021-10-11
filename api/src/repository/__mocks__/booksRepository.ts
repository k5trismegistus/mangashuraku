
import { BookParams, Book } from '../../models/book'

const mockBook = new Book({
  _id: 'testtesttest',
  archiveUUID: 'test',
  originalName: 'test',
  pages: [],
  thumbnails: [],
  cover: '',
  coverThumbnail: '',
  createdAt: new Date(),
})

const mockBooks = [
  mockBook
]

export class BooksRepository {
  async insertBook(_): Promise<Book> {
    return new Promise((resolve, reject) => {
      resolve(mockBook)
    })
  }

  async indexBook(_) {
    return new Promise((resolve, reject) => {
      resolve({ total: 1, books: mockBooks })
    })
  }

  async findBook (_) {
    return new Promise((resolve, reject) => {
      resolve(mockBook)
    })
  }

  async deleteBook (_) {
    return new Promise((resolve, reject) => {
      resolve({})
    })
  }
}
