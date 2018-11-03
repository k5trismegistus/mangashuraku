
import { Book, IBookParameter } from '../../models/book'
import { ObjectId } from 'mongodb';

const mockBook = new Book({
  id: new ObjectId('testtesttest'),
  archiveUUID: 'test',
  originalName: 'test',
  title: '',
  authorIds: [],
  organizationIds: [],
  genreIds: [],
  pages: [],
  thumbnails: [],
  cover: '',
  coverThumbnail: '',
  createdAt: new Date(),
})

const mockBooks = [
  mockBook
]

export const insertBook = (params: IBookParameter): Promise<Book> => {
  return new Promise((resolve, reject) => {
    resolve(mockBook)
  })
}

export const indexBook = async (params) => {
  return { total: 1, books: mockBooks }
}

export const findBook = async (params) => {
  return mockBook
}

export const deleteBook = async ({ bookId }) => {
  return
}