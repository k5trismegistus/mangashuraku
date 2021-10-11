import { Db } from "mongodb"
import { BooksRepository } from "./booksRepository"

export const initRepositories = (db: Db) => {
  return {
    booksRepository: (new BooksRepository(db))
  }
}