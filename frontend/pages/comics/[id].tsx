import React, { useState } from 'react'

import { apiClient } from "../../utils/apiClient"

import SinglePageReader from '../../components/comic_reader/SinglePageReader'

const Comic =  ({ comic }) => {
  const [currentPageNumber, setCurrentPageNumber] = useState(1)
  const goPreviousPage = () => {
    if (currentPageNumber === 0) {
      return
    }
    setCurrentPageNumber(currentPageNumber - 1)
  }
  const goForwardPage = () => {
    if (currentPageNumber === comic.pages.length) {
      return
    }
    setCurrentPageNumber(currentPageNumber + 1)
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

export const getServerSideProps = async (ctx) => {
  const comic = await apiClient.getComic({ id: '5bdc501b83e7550010fd328c' })
  return { props: { comic } }
}

export default Comic