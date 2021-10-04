import React, { useState } from 'react'

import ComicBookPage from './ComicBookPage'

import { ComicBook } from '../../types'

import styles from './SinglePageReader.module.css'
import Comic from '../../pages/comics/[id]'

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

const SinglePageReader = ({ comic }) => {
  const [currentPageNumber, setCurrentPageNumber] = useState(1)

  return (
    <div>
      <div
        className={styles.topButton}
      />
      <div
        className={styles.leftButton}
      />
      <div
        className={styles.centerButton}
      />
      <div
        className={styles.rightButton}
      />
      {getBookPageComponent(comic, currentPageNumber)}

    </div>
  )
}

export default SinglePageReader
