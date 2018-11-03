import * as React from 'react'
import { Book } from '../models'
import { BookPage } from '../components/reader/BookPage'

const PageBasePath = `http://${process.env.MINIO_ENDPOINT}/mangashuraku`

const getBookPageComponent = (book: Book, pageNumber: number) {
  if (pageNumber < 0 || pageNumber > book.pages.length - 1) {
    return null
  }

  return <BookPage
    imgSrc={`${PageBasePath}/${book.pages[pageNumber]}`}
  />
}

export default getBookPageComponent
