import React, { useState } from 'react'

import styles from './SinglePageReader.module.css'


const SinglePageReader = ({ book }) => {
  const [currentPage, setCurrentPage] = useState(0)

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
      {currentPage}

    </div>
  )
}

export default SinglePageReader
