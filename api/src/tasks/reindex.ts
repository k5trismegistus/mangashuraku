import { BooksRepository } from "../repository/booksRepository"
import { esClient } from "../lib/elasticsearch"

class ReindexTask {
  booksRepository: BooksRepository

  constructor({ booksRepository }) {
    this.booksRepository = booksRepository
  }

  async run() {
    try {
      await esClient.indices.delete({ index: BooksRepository.indexName() })

      await esClient.indices.create({
        index: BooksRepository.indexName(),
        body: BooksRepository.esIndexConfig,
      })
    } catch(e) {
      console.error(e)
      throw e
    }

    const per_page = 20
    let page = 0
    while(true) {
      const res = await this.booksRepository.indexBook({ limit: per_page, offset: per_page * page})
      const books = res.books

      if (books.length === 0) {
        break
      }

      await this.booksRepository.indexBulk(books)
      page = page + 1
    }
  }

}

export { ReindexTask }