import { BooksRepository } from "../repository/booksRepository"
import { esClient } from "../lib/elasticsearch"

class ReindexTask {
  booksRepository: BooksRepository

  constructor({ booksRepository }) {
    this.booksRepository = booksRepository
  }

  async run() {
    try {
      esClient.indices.delete({ index: BooksRepository.indexName() })

      esClient.indices.create({
        index: BooksRepository.indexName(),
        body: { mappings: BooksRepository.esMapping() },
      })
    } catch(e) {
      console.error(e)
      throw e
    }

    const per_page = 20
    let page = 0
    while(true) {
      const res = await this.booksRepository.indexBook({ limit: per_page, offset: per_page * page})
      console.log(res.total)
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