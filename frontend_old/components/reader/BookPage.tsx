import * as React from 'react'
import styles from './BookPage.css'

interface Props {
  imgSrc: string
}

export const BookPage = ({
  imgSrc
}: Props) => (
  <div className={styles.page}>
    <img src={imgSrc} />
  </div>
)
