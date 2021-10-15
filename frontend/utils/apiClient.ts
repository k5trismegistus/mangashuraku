import axios from 'axios'
import { ComicBook, ComicBookList } from '../types'

const apiHost = (process.env.PRIVATE_API_ENDPOINT) ?
  process.env.PRIVATE_API_ENDPOINT :
  process.env.NEXT_PUBLIC_API_ENDPOINT
const instance = axios.create({ baseURL: `http://${apiHost}/api` })

type IndexBooksParams = {
  searchQuery: string
  page: number
}

export const apiClient = {
  indexBooks: async (params: IndexBooksParams): Promise<ComicBookList> => {
    try {
      const res = await instance.get(`/books/`, { params })

      const count: number = res.data.meta.total
      const comicBooks: ComicBook[] = res.data.data.books
      return { count, comicBooks }
    } catch(e) {
      console.error(e)
      throw e
    }
  },

  getComic: async ({ id }): Promise<ComicBook> => {
    try {
      const res = await instance.get(`/books/${id}`)
      return res.data.data.book
    } catch (e) {
      console.error(e)
      throw e
    }
  },

  deleteBook: async (id: string): Promise<void> => {
    try {
      const res = await instance.delete(`/books/${id}`)
      return
    } catch (e) {
      console.error(e)
      throw e
    }
  }
}

