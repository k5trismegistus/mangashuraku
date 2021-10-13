import { Collection, Db, ObjectId } from 'mongodb'
import { BookParams, Book } from '../models/book'

const COLLECTION_NAME = 'books'
export class BooksRepository {
  booksCollection: Collection

  constructor (mongoConnection: Db) {
    this.booksCollection = mongoConnection.collection(COLLECTION_NAME)
  }

  async insertBook(params: BookParams): Promise<Book> {
    const createdAt = new Date()
    try {
      const result = await this.booksCollection.insertOne({
        _id: (new ObjectId(params._id)),
        archiveUUID: params.archiveUUID,
        originalName: params.originalName,
        pages: params.pages,
        thumbnails: params.thumbnails,
        cover: params.cover,
        coverThumbnail: params.coverThumbnail,
        createdAt: createdAt
      })
      const book = new Book({
        _id: result.insertedId.toString(),
        createdAt: new Date(),
        ...params,
      })
      return book
    } catch(e) {
      console.error(e)
      throw e
    }
  }

  async indexBook({ limit, offset }) {
    const rawResult = await this.booksCollection
      .find()
      .sort({ order_by: -1 })
      .skip(offset ? offset : 0)
      .limit(limit ? limit : 20)

    const total = await rawResult.count()
    const results = await rawResult.toArray()
    const books = results.map(result => new Book({
      _id: result._id,
      archiveUUID: result.archiveUUID,
      originalName: result.originalName,
      pages: result.pages,
      thumbnails: result.thumbnails,
      cover: result.cover,
      coverThumbnail: result.coverThumbnail,
      createdAt: (new Date(result.createdAt))
    }))

    return {
      total,
      books,
    }
  }

  async findBook({ bookId }): Promise<Book>  {
    const oid = new ObjectId(bookId)
    const result = await this.booksCollection
      .findOne({ _id: oid })
    return new Book({
      _id: result._id,
      archiveUUID: result.archiveUUID,
      originalName: result.originalName,
      pages: result.pages,
      thumbnails: result.thumbnails,
      cover: result.cover,
      coverThumbnail: result.coverThumbnail,
      createdAt: (new Date(result.createdAt))
    })
  }

  async deleteBook({ bookId }) {
    const oid = new ObjectId(bookId)
    await this.booksCollection.deleteOne({ _id: oid })
  }
}