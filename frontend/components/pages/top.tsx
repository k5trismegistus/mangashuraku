import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import { BookSummary } from '../../models';

import { Link } from 'react-router-dom'
import BookTile from '../Top/BookTile'

interface Props {
  books: Array<BookSummary>
  openBook: (string) => void
}

export const Top = ({
  books,
  openBook,
}: Props) => (
  <div>
    <Grid container>
      {
        books.map(book => (
          <Grid
            item
            key={book._id}
          >
            <Link to={`/books/${book._id}`}>
              <BookTile
                book={book}
              />
            </Link>
          </Grid>
        ))
      }
    </Grid>
  </div>
)
