import { Db, ObjectId } from "mongodb";
import { IBookParameter, Book } from "../models/book";
import { String } from "aws-sdk/clients/cloudwatchevents";
import { BookIndexFields } from '../models/book'


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
  search?: String
  orderBy?: 'createdAt'
  asc?: boolean
  limit?: number
  offset?: number
}

export interface FindBookParams {
  bookId: string
}

export const indexBook = (db: Db, params: IndexBookParams) => {
  return new Promise((resolve, reject) => {
    const searchQuery = params.search ?
      { $or: [{ title: params.search }, {filename: params.search}] } :
      {}

    db.collection(COLLECTION_NAME)
      .find(searchQuery, BookIndexFields)
      .sort({ order_by: -1 })
      .skip(params.offset ? params.offset : 0)
      .limit(params.limit ? params.limit: 20)
      .toArray()
      .then(resolve)
      .catch(reject)
  })
}

export const findBook = (db: Db, params: FindBookParams) => {
  const oid = new ObjectId(params.bookId)
  return new Promise((resolve, reject) => {
    db.collection(COLLECTION_NAME)
      .findOne({ _id: oid })
      .then(resolve)
      .catch(reject)
  })
}
