import * as React from 'react'
import {
  Grid,
  TableRow,
  TablePagination,
} from '@material-ui/core'
import { BookSummary } from '../../models';

import { Link } from 'react-router-dom'
import SearchField from '../Top/SearchField'
import BookTile from '../Top/BookTile'

import styles from './Top.css'

interface Props {
  books: Array<BookSummary>
  query: string
  page: number
  total: number
  fetchBookList: (page: number, query: string) => void
}

export const Top = ({
  books,
  query,
  page,
  total,
  fetchBookList,
}: Props) => (
  <div className={styles.container}>
    <Grid container>
      <Grid
        className={styles.searchField}
        item
        xs={12}
      >
        <SearchField
          query={query}
          fetchBookList={fetchBookList}
        />
      </Grid>
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
      <Grid
        className={styles.pager}
        item
        xs={12}
      >
        <TableRow>
          <TablePagination
            count={total}
            rowsPerPage={1}
            page={page}
            rowsPerPageOptions={[1]}
            onChangePage={(e, page) => fetchBookList(page, query)}
          />
        </TableRow>
      </Grid>
    </Grid>
  </div>
)
