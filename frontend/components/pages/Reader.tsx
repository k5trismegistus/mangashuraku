import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import { Book } from '../../models';

import { SinglePageReader } from '../reader/SinglePageReader'

import styles from './Reader.css'

interface Props {
  book: Book
  currentPageNumber: number
  singlePageView: Boolean
}

export const Reader = ({
  book,
  currentPageNumber,
  singlePageView,
}: Props) => (
  <div>
    <Grid container className={styles.container}>
      <SinglePageReader
        book={book}
        currentPageNumber={currentPageNumber}
      />
    </Grid>
  </div>
)
