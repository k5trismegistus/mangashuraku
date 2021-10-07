import React, { useState } from 'react'
import { useRouter } from 'next/dist/client/router'

import { apiClient } from "../../utils/apiClient"

import SinglePageReader from '../../components/comic_reader/SinglePageReader'
import QuickBar from '../../components/comic_reader//QuickBar'

import { ComicBook } from '../../types'

import styles from './[id].module.css'

type Props = {
  comic: ComicBook
  initialPageNumber: number
}

const Comic =  ({ comic, initialPageNumber }: Props) => {
  const router = useRouter()

  const [currentPageNumber, setCurrentPageNumber] = useState(initialPageNumber)
  const [showQuickBar, setShowQuickBar] = useState(false)
  const goPreviousPage = () => {
    if (currentPageNumber === 0) {
      return
    }
    const newPageNumber = currentPageNumber - 1
    changePage(newPageNumber)
  }

  const goForwardPage = () => {
    if (currentPageNumber === comic.pages.length) {
      return
    }
    const newPageNumber = currentPageNumber + 1
    changePage(newPageNumber)
  }

  const changePage = (newPageNumber: number) => {
    router.push(`${window.location.pathname}?page=${newPageNumber}`)
    setCurrentPageNumber(newPageNumber)
  }

  const toggleQuickBar = () => {
    setShowQuickBar(!showQuickBar)
  }

  return (
    <div className={styles.root}>

      <div
        className={styles.topButton}
      />
      <div
        onClick={goPreviousPage}
        className={styles.leftButton}
      />
      <div
        onClick={toggleQuickBar}
        className={styles.centerButton}
      />
      <div
        onClick={goForwardPage}
        className={styles.rightButton}
      />
      <SinglePageReader
        comic={comic}
        currentPageNumber={currentPageNumber}
      />

      <div
        className={styles.quickBar}
        style={showQuickBar ? null: {display: 'none'}}
      >
        <QuickBar
          thumbnails={comic.thumbnails}
          leftToRight={false}
          currentPageNumber={currentPageNumber}
          changePage={changePage}
        />
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ query }): Promise<{props: Props}> => {
  const comicId = query.id
  const initialPageNumber = (query.page) ?
    parseInt(query.page) : 1
  const comic = await apiClient.getComic({ id: comicId })
  return { props: { comic, initialPageNumber } }
}

export default Comic