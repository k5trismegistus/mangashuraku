import { Db, ObjectId } from "mongodb";
import { IBookParameter, Book } from "../models/book";
import { BookIndexFields } from '../models/book'
import { resolve } from "dns";


const COLLECTION_NAME = 'books'

export const insertBook = (db: Db, params: IBookParameter): Promise<Book> => {
  return new Promise((resolve, reject) => {
    db.collection(COLLECTION_NAME).insertOne(params, (err, result) => {
      if (err) return reject(err)

      const book = new Book({
        id: result.insertedId,
        createdAt: new Date(),
        ...params
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

export const indexBook = async (db: Db, params: IndexBookParams) => {
  const searchQuery = params.search ?
    { $or: [
      { title: new RegExp(".*" + params.search + ".*" , "i") },
      { originalName: new RegExp(".*" + params.search + ".*" , "i") }
    ]} :
    {}

  const result = await db.collection(COLLECTION_NAME)
    .find(searchQuery, BookIndexFields)
    .sort({ order_by: -1 })
    .skip(params.offset ? params.offset : 0)
    .limit(params.limit ? params.limit: 20)

  const total = await result.count()
  const books = await result.toArray()

  return {
    meta: { total },
    data: { books },
  }
}

export const findBook = async (db: Db, params: FindBookParams) => {
  const oid = new ObjectId(params.bookId)
  const book = await  db.collection(COLLECTION_NAME)
                          .findOne({ _id: oid })
  return {
    data: { book }
  }
}
