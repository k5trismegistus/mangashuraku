import axios from 'axios'

import {
  convertBooksIndex,
  convertBook,
} from './resposneConverters'

const BASE_PATH = 'http://localhost:3001/api'

export const booksIndex = (params) => {
  return axios.get(`${BASE_PATH}/books/`, { params })
       .then((response) => {
          return convertBooksIndex(response)
       })
}

export const book = (id: string) => {
  return axios.get(`${BASE_PATH}/books/${id}`)
       .then((response) => {
          return convertBook(response)
       })
}
