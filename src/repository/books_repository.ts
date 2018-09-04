import { Db } from "mongodb";
import { IBookParameter, Book } from "../models/book";

const COLLECTION_NAME = 'books'

export const insertBook = (db: Db, params: IBookParameter): Promise<Book> => {
  return new Promise((resolve, reject) => {
    db.collection(COLLECTION_NAME).insertOne(params, (err, result) => {
      if (err) return reject(err)

      const book = new Book({
        id: result.insertedId,
        ...params
      })

      resolve(book)
    })
  })
}
