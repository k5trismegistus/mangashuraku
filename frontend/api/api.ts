import axios from 'axios'

import {
  convertBooksIndex,
  convertBook,
} from './resposneConverters'

const BASE_PATH = 'http://localhost:3001/api'

export const getBooksIndex = (params) => {
  return axios.get(`${BASE_PATH}/books/`, { params })
       .then((response) => {
          return convertBooksIndex(response)
       })
}

export const getBook = (id: string) => {
  return axios.get(`${BASE_PATH}/books/${id}`)
       .then((response) => {
          return convertBook(response)
       })
}

export const deleteBook = (id: string) => {
  return axios.delete(`${BASE_PATH}/books/${id}`)
}
