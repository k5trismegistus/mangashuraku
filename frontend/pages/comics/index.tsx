import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/dist/client/router'

import { useRecoilState } from 'recoil'
import { searchQueryState, pageState } from '../../stores/comicSearchState'

import { apiClient } from "../../utils/apiClient"

import Link from 'next/link'
import ComicBookTile from '../../components/tiles/ComicBookTile'

import { ComicBook, ComicBookList } from '../../types'

import { Grid, Button, Select, MenuItem, TextField,} from '@mui/material'

import styles from './index.module.css'


type Props = {
  initialShowingComicBooks: ComicBook[]
  initialTotalComicBooks: number
  initialPage: number
  initialSearchQuery: string
}

type Params = {
  page?: string
  q?: string
}

const PER_PAGE = 20

const ComicTop = ({
  initialShowingComicBooks,
  initialTotalComicBooks,
  initialPage,
  initialSearchQuery,
}: Props) => {
  const router = useRouter()

  const [comicBooks, setComicBooks] = useState(initialShowingComicBooks)
  const [totalComicBooks, setTotalComicBooks] = useState(initialTotalComicBooks)
  const [page, setPage] = useRecoilState(pageState)
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState)
  const [inputtingSearchQuery, setInputtingSearchQuery] = useState('')
  useEffect(() => {
    setSearchQuery(initialSearchQuery)
    setInputtingSearchQuery(initialSearchQuery)
    setPage(initialPage)
  }, [])

  const fetchComicBookList = async ({ page, searchQuery }) => {
    const comicBooksRes = await apiClient.indexBooks({ page, searchQuery })
    setPage(page)
    setSearchQuery(searchQuery)
    setComicBooks(comicBooksRes.comicBooks)
    setTotalComicBooks(comicBooksRes.count)

    const params: Params = {}
    if (page) params.page = page.toString()
    if (searchQuery) params.q = searchQuery
    const paramsObj = new URLSearchParams(params)

    router.push(`${window.location.pathname}?${paramsObj.toString()}`)
  }

  const handleSearch = async () => {
    setSearchQuery(inputtingSearchQuery)

    await fetchComicBookList({ page: 1, searchQuery: inputtingSearchQuery })
  }

  return (
    <div className={styles.container}>
      <Grid container>
        <Grid
          className={styles.searchField}
          item
          xs={12}
        >
          <TextField
            defaultValue={inputtingSearchQuery}
            onChange={(e) => setInputtingSearchQuery(e.target.value)}
          />
          <Button variant="contained" onClick={handleSearch}>Search</Button>
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
                <Link href={`/comics/${comicBook._id}`} passHref>
                  <a className={styles.linkTileWrapper}>
                    <ComicBookTile
                      comicBook={comicBook}
                    />
                  </a>
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
            page > 1 ?
              <Button
                onClick={() => fetchComicBookList({ page: (page - 1), searchQuery }) }
                size="large"
                variant="contained"
                className={styles.backButton}
              >
                {'<'}
              </Button> : null
          }
          <p className={styles.pageNumber}>{page} of {Math.ceil(totalComicBooks / PER_PAGE)}</p>
          <Select
            value={page}
            onChange={(e) => fetchComicBookList({ page: e.target.value, searchQuery }) }
          >
            {
              Array.from(Array(Math.ceil(totalComicBooks / PER_PAGE)), (v, k) => k).map((i) => (
                  // UIに表示されるページ番号は1始まり
                  <MenuItem value={i + 1}>{i + 1}</MenuItem>
                ))
              }
          </Select>
          {
            page < Math.ceil(totalComicBooks / PER_PAGE) ?
              <Button
                onClick={() => fetchComicBookList({ page: (page + 1), searchQuery }) }
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
    Math.max(parseInt(query.page), 1) : 1
  const comicBooksRes = await apiClient.indexBooks({ searchQuery, page: initialPageNumber })

  return { props: {
    initialShowingComicBooks: comicBooksRes.comicBooks,
    initialTotalComicBooks: comicBooksRes.count,
    initialPage: initialPageNumber,
    initialSearchQuery: searchQuery,
  } }
}

export default ComicTop