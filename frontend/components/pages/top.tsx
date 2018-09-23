import * as React from 'react'
import Grid from '@material-ui/core/Grid'import { BookSummary } from '../../models';

import BookTile from '../Top/BookTile'
import GridListTile from '@material-ui/core/GridListTile'

interface Props {
  books: Array<BookSummary>
}

const styles = {
  card: {
    width: 320,
  },
  cover: {
    height: 480,
    width: 320
  },
}

export const Top = ({
  books
}: Props) => (
  <div>
    <Grid container>
      {
        books.map(book => (
          <Grid item key={book._id}>
            <BookTile
              book={book}
            />
          </Grid>
        ))
      }
    </Grid>
  </div>
)
