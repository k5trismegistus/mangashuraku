import * as React from 'react'
import {
  Grid,
  Button,
  Select,
  MenuItem,
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

const PER_PAGE = 20

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
      <Grid
        container
      >
        {
          books.map(book => (
            <Grid
              item
              key={book._id}
              xs={3}
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
      <Grid
        className={styles.pager}
        item
        xs={12}
      >

        {
          page > 0 ?
            <Button
              onClick={() => fetchBookList(page - 1, query) }
              size="large"
              variant="contained"
              className={styles.backButton}
            >
              {'<'}
            </Button> : null
        }
        <p className={styles.pageNumber}>{page} of {Math.floor(total / PER_PAGE)}</p>
        <Select
          value={page}
          onChange={(e) => fetchBookList(e.target.value, query) }
        >
          {
            Array.from(Array(Math.ceil(total / PER_PAGE)), (v, k) => k).map((i) => (
                <MenuItem value={i}>{i}</MenuItem>
              ))
            }
        </Select>
        {
          page < Math.floor(total / PER_PAGE) ?
            <Button
              onClick={() => fetchBookList(page + 1, query) }
              size="large"
              variant="contained"
              className={styles.forwardButton}
            >
              {'>'}
            </Button> : null
          }
      </Grid>
    </Grid>
  </div>
)
