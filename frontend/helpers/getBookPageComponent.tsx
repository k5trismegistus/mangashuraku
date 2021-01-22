import * as React from 'react'
import { Book } from '../models'
import { BookPage } from '../components/reader/BookPage'

const PageBasePath = `http://${process.env.MINIO_ENDPOINT}/mangashuraku`

const getBookPageComponent = (book: Book, pageNumber: number) {
  if (pageNumber < 1 || pageNumber > book.pages.length) {
    return null
  }

  return <BookPage
    // The page number to display starts from 1
    // The index of first element of list of Javascript is 0
    imgSrc={`${PageBasePath}/${book.pages[pageNumber - 1]}`}
  />
}

export default getBookPageComponent
