import React, { useState } from 'react'

import { apiClient } from "../../utils/apiClient"

import Link from 'next/link'
import ComicBookTile from '../../components/tiles/ComicBookTile'

import { ComicBook, ComicBookList } from '../../types'

import { Grid, Button, Select, MenuItem,} from '@mui/material'

// import SearchField from '../Top/SearchField'
import styles from './index.module.css'


type Props = {
  initialShowingComicBooks: ComicBook[]
  initialTotalComicBooks: number
  initialPage: number
  initialSearchQuery: string
}

const PER_PAGE = 20

const ComicTop = ({
  initialShowingComicBooks,
  initialTotalComicBooks,
  initialPage,
  initialSearchQuery,
}: Props) => {

  const [comicBooks, setComicBooks] = useState(initialShowingComicBooks)
  const [totalComicBooks, setTotalComicBooks] = useState(initialTotalComicBooks)
  const [page, setPage] = useState(initialPage)
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery)

  const fetchComicBookList = async ({ page, searchQuery }) => {
    const comicBooksRes = await apiClient.indexBooks({ page, searchQuery })
    setPage(page)
    setSearchQuery(searchQuery)
    setComicBooks(comicBooksRes.comicBooks)
    setTotalComicBooks(comicBooksRes.count)
  }

  return (
    <div className={styles.container}>
      <Grid container>
        <Grid
          className={styles.searchField}
          item
          xs={12}
        >
          {/* <SearchField
            query={query}
            fetchBookList={fetchBookList}
          /> */}
        </Grid>
        <Grid
          container
        >
          {
            comicBooks.map(comicBook => (
              <Grid
                item
                key={comicBook._id}
                xs={3}
              >
                <Link href={`/books/${comicBook._id}`}>
                  <ComicBookTile
                    comicBook={comicBook}
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
                onClick={() => fetchComicBookList({ page: page - 1, searchQuery }) }
                size="large"
                variant="contained"
                className={styles.backButton}
              >
                {'<'}
              </Button> : null
          }
          <p className={styles.pageNumber}>{page + 1} of {Math.ceil(totalComicBooks / PER_PAGE)}</p>
          <Select
            value={page}
            onChange={(e) => fetchComicBookList({ page: e.target.value, searchQuery }) }
          >
            {
              Array.from(Array(Math.ceil(totalComicBooks / PER_PAGE)), (v, k) => k).map((i) => (
                  // UIに表示されるページ番号は1始まり
                  <MenuItem value={i}>{i + 1}</MenuItem>
                ))
              }
          </Select>
          {
            page < Math.ceil(totalComicBooks / PER_PAGE) - 1 ?
              <Button
                onClick={() => fetchComicBookList({ page: page + 1, searchQuery }) }
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
}

export const getServerSideProps = async ({ query }): Promise<{props: Props}> => {
  const searchQuery = (query.q) ?
    query.q : ''
  const initialPageNumber = (query.page) ?
    parseInt(query.page) : 1
  const comicBooksRes = await apiClient.indexBooks({ searchQuery, page: initialPageNumber })
  return { props: {
    initialShowingComicBooks: comicBooksRes.comicBooks,
    initialTotalComicBooks: comicBooksRes.count,
    initialPage: initialPageNumber,
    initialSearchQuery: searchQuery,
  } }
}

export default ComicTop