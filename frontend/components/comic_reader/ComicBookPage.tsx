import * as React from 'react'
import styles from './ComicBookPage.module.css'

type Props = {
  imgSrc: string
}

const ComicBookPage = ({
  imgSrc
}: Props) => (
  <div className={styles.pageContainer}>
    <div
      className={styles.pageImage}
      style={{backgroundImage: `url(${imgSrc})`}}
    ></div>
  </div>
)

export default ComicBookPage