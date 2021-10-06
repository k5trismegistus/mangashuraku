import React, { useState } from 'react'

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
  goPreviousPage: () => void
  goForwardPage: () => void
}

const SinglePageReader = ({
  comic,
  currentPageNumber,
  goPreviousPage,
  goForwardPage,
}: Props) => {

  // まずは左右切替無しで、つぎのページに行くだけ
  const onClickLeft = () => {
    goForwardPage()
  }
  // まずは左右切替無しで、前のページに行くだけ
  const onClickRight = () => {
    goPreviousPage()
  }

  return (
    <div className={styles.singlePageReaderContainer}>
      <div
        className={styles.topButton}
      />
      <div
        onClick={onClickLeft}
        className={styles.leftButton}
      />
      <div
        className={styles.centerButton}
      />
      <div
        onClick={onClickRight}
        className={styles.rightButton}
      />

      {getBookPageComponent(comic, currentPageNumber)}

    </div>
  )
}

export default SinglePageReader
