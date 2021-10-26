import { Collection, Db, ObjectId } from 'mongodb'
import { esClient } from '../lib/elasticsearch'
import { BookParams, Book } from '../models/book'

const COLLECTION_NAME = 'books'
const INDEX_NAME = 'books'

const bookIndexData = (book: Book) => ({
  id: book._id, // cannot use field staring with _ is not available in Elasticsearch
  originalName: book.originalName,
  createdAt: book.createdAt
})
export class BooksRepository {
  booksCollection: Collection

  constructor (mongoConnection: Db) {
    this.booksCollection = mongoConnection.collection(COLLECTION_NAME)
  }

  static collectionName() {
    return COLLECTION_NAME
  }

  static indexName() {
    return INDEX_NAME
  }

  static esIndexConfig() {
    return {
      settings: {
        analysis: {
          analyzer: {
            kuromoji: {
              type: "custom",
              tokenizer: "kuromoji_tokenizer"
            }
          }
        }
      },
      mappings: {
        id: { type: 'string' },
        originalName: {
          type: 'text',
          analyzer: 'kuromoji',
          term_vector: "with_positions_offsets",
        },
        createdAt: { type: 'date' },
      }
    }
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

    const total = await this.booksCollection.countDocuments()
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

  async searchBook({ searchQuery, perPage, from }) {
    const { body } = await esClient.search({
      index: INDEX_NAME,
      body: {
        query: {
          query_string: {
            query: searchQuery,
          },
        },
        size: perPage,
        from: from,
      }
    })

    const total = body.hits.total.value
    const bookIds = body.hits.hits.map((h) => (h._source.id))

    const books = await this.findBooks({ bookIds })

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

  async findBooks({ bookIds }): Promise<Book[]>  {
    const oids = bookIds.map((oid) => (new ObjectId(oid)))
    const cursor = await this.booksCollection
      .find({ _id: { $in: oids }})
    const results = await cursor.toArray()
    console.log(await cursor.count())

    return results.map((result) => (new Book({
      _id: result._id,
      archiveUUID: result.archiveUUID,
      originalName: result.originalName,
      pages: result.pages,
      thumbnails: result.thumbnails,
      cover: result.cover,
      coverThumbnail: result.coverThumbnail,
      createdAt: (new Date(result.createdAt))
    })))
  }

  async deleteBook({ bookId }) {
    const oid = new ObjectId(bookId)
    await this.booksCollection.deleteOne({ _id: oid })
  }

  async index(book: Book) {
    const body = bookIndexData(book)

    esClient.index({
      index: INDEX_NAME,
      body
    })
  }

  async indexBulk(books: Book[]) {
    const data = books.map((book) => (bookIndexData(book)))
    const body = data.flatMap((doc) => ([{ index: { _index: INDEX_NAME } }, doc]))
    await esClient.bulk({ refresh: true, body })
  }

  async deleteIndex() {
    await esClient.indices.delete({ index: INDEX_NAME })
  }
}