import React, { useState } from 'react'

import { apiClient } from "../../utils/apiClient"

import SinglePageReader from '../../components/comic_reader/SinglePageReader'
import { ComicBook } from '../../types'
import { useRouter } from 'next/dist/client/router'

type Props = {
  comic: ComicBook
  initialPageNumber: number
}

const Comic =  ({ comic, initialPageNumber }: Props) => {
  const router = useRouter()

  const [currentPageNumber, setCurrentPageNumber] = useState(initialPageNumber)
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

  return (
    <div>
      <SinglePageReader
        comic={comic}
        currentPageNumber={currentPageNumber}
        goPreviousPage={goPreviousPage}
        goForwardPage={goForwardPage}
      />
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