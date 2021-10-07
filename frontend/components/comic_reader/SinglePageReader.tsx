import React, { useState } from 'react'

import QuickBar from './QuickBar'
import ComicBookPage from './ComicBookPage'

import { ComicBook } from '../../types'

import styles from './SinglePageReader.module.css'

// Helper function
const getBookPageComponent = (comic: ComicBook, pageNumber: number) => {
  if (pageNumber < 1 || pageNumber > comic.pages.length) {
    return null
  }

  return <ComicBookPage
    // The page number to display starts from 1
    // The index of first element of list of Javascript is 0
    imgSrc={`http://192.168.11.12:8000/mangashuraku/${comic.pages[pageNumber - 1]}`}
  />
}

type Props = {
  comic: ComicBook
  currentPageNumber: number,
}

const SinglePageReader = ({
  comic,
  currentPageNumber,
}: Props) => {
  return (
    <div className={styles.singlePageReaderContainer}>
      {getBookPageComponent(comic, currentPageNumber)}

    </div>
  )
}

export default SinglePageReader
