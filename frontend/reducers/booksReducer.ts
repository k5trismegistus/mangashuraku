import { Action } from 'redux'
import {
  BookSummary,
} from '../models'

// Definition of Store

export interface BooksStore {
  isFetching: boolean
  books: Array<BookSummary>
  total: number
  page: number
  query: string
}

export const initialBooksStore = {
  isFetching: false,
  books: [],
  total: 0,
  page: 0,
  query: '',
}

// Definitions of Action & ActionCreator

export enum ACTIONS {
  FETCH_BOOK_LIST = 'FETCH_BOOK_LIST',
  FETCH_BOOK_LIST_SUCCEEDED = 'FETCH_BOOK_LIST_SUCCEEDED',
  FETCH_BOOK_LIST_FAILED = 'FETCH_BOOK_LIST_FAILED',
}

export type BooksActions =
  FetchBookList |
  FetchBookListSucceeded |
  FetchBookListFailed

interface FetchBookList extends Action {
  type: ACTIONS.FETCH_BOOK_LIST
  page: number
  query: string
}

export const fetchBookList = (page: number, query: string): FetchBookList => ({
  type: ACTIONS.FETCH_BOOK_LIST,
  page,
  query,
})

interface FetchBookListSucceeded extends Action {
  type: ACTIONS.FETCH_BOOK_LIST_SUCCEEDED,
  books: Array<BookSummary>,
  total: number,
}

export const fetchBookListSucceeded = (books, total): FetchBookListSucceeded => ({
  type: ACTIONS.FETCH_BOOK_LIST_SUCCEEDED,
  books,
  total,
})

interface FetchBookListFailed extends Action {
  type: ACTIONS.FETCH_BOOK_LIST_FAILED
}

export const fetchBookListFailed = (): FetchBookListFailed => ({
  type: ACTIONS.FETCH_BOOK_LIST_FAILED
})

// Definition of Reducer

export const booksReducer = (state: BooksStore = initialBooksStore, action: BooksActions) => {
  switch (action.type) {
    case ACTIONS.FETCH_BOOK_LIST:
      return Object.assign({}, state, {
        isFetching: true,
        books: state.books,
        page: action.page,
        query: action.query,
      })
    case ACTIONS.FETCH_BOOK_LIST_SUCCEEDED:
      return Object.assign({}, state, {
        isFetching: false,
        books: action.books,
        total: action.total,
      })
    case ACTIONS.FETCH_BOOK_LIST_FAILED:
      return Object.assign({}, state, {
        isFetching: false,
        books: [],
      })
  }
  return state
}


