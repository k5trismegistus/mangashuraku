import axios from 'axios'

import {
  convertBooksIndex,
  convertBook,
} from './resposneConverters'

const BASE_PATH = 'http://localhost:3001/api'

export interface BookIndexParams {

}

export const booksIndex = (params: BookIndexParams) => {
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