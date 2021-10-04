import * as React from 'react'
import styles from './ComicBookPage.module.css'

type Props = {
  imgSrc: string
}

const ComicBookPage = ({
  imgSrc
}: Props) => (
  <div className={styles.pageContainer}>
    <img
      className={styles.pageImage}
      src={imgSrc}
    />
  </div>
)

export default ComicBookPage