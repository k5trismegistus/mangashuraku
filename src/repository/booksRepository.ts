import { Db, ObjectId } from 'mongodb'
import {mongodb} from '../lib/mongo'
import { IBookParameter, Book } from '../models/book'
import { BookIndexFields } from '../models/book'

const COLLECTION_NAME = 'books'

export const insertBook = (params: IBookParameter): Promise<Book> => {
  return new Promise((resolve, reject) => {
    mongodb.collection(COLLECTION_NAME).insertOne(params, (err, result) => {
      if (err) return reject(err)

      const book = new Book({
        id: result.insertedId,
        createdAt: new Date(),
        ...params,
      })

      resolve(book)
    })
  })
}

export interface IndexBookParams {
  search?: string
  orderBy?: 'createdAt'
  asc?: boolean
  limit?: number
  offset?: number
}

export interface FindBookParams {
  bookId: string
}

export const indexBook = async (params: IndexBookParams) => {
  const searchQuery = params.search
    ? {
        $or: [
          { title: new RegExp('.*' + params.search + '.*', 'i') },
          { originalName: new RegExp('.*' + params.search + '.*', 'i') },
        ],
      }
    : {}

  const result = await mongodb
    .collection(COLLECTION_NAME)
    .find(searchQuery, BookIndexFields)
    .sort({ order_by: -1 })
    .skip(params.offset ? params.offset : 0)
    .limit(params.limit ? params.limit : 20)

  const total = await result.count()
  const booksParams = await result.toArray()
  const books = booksParams.map((p) => (new Book(p)))

  return {
    total,
    books
  }
}

export const findBook = async (params: FindBookParams): Promise<Book> => {
  const oid = new ObjectId(params.bookId)
  const bookParams = await mongodb.collection(COLLECTION_NAME).findOne({ _id: oid })
  return  new Book(bookParams)
}

export const deleteBook = async ({ bookId }) => {
  const oid = new ObjectId(bookId)
  await mongodb.collection(COLLECTION_NAME).remove({ _id: oid })
}
