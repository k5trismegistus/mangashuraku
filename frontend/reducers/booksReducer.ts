import { Action } from 'redux'
import { BookSummary } from '../models'

// Definition of Store

export interface BooksStore {
  isFetching: boolean
  books: Array<BookSummary>
}

export const initialBookStore = {
  isFetching: false,
  books: [],
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
}

export const fetchBookList = (): FetchBookList => ({
  type: ACTIONS.FETCH_BOOK_LIST
})

interface FetchBookListSucceeded extends Action {
  type: ACTIONS.FETCH_BOOK_LIST_SUCCEEDED,
  books: Array<BookSummary>,
}

export const fetchBookListSucceeded = (books): FetchBookListSucceeded => ({
  type: ACTIONS.FETCH_BOOK_LIST_SUCCEEDED,
  books
})

interface FetchBookListFailed extends Action {
  type: ACTIONS.FETCH_BOOK_LIST_FAILED
}

export const fetchBookListFailed = (): FetchBookListFailed => ({
  type: ACTIONS.FETCH_BOOK_LIST_FAILED
})

// Definition of Reducer

export const booksReducer = (state: BooksStore = initialBookStore, action: BooksActions) => {
  switch (action.type) {
    case ACTIONS.FETCH_BOOK_LIST_SUCCEEDED:
      return Object.assign({}, state, {
        isFetching: false,
        books: action.books
      })
    case ACTIONS.FETCH_BOOK_LIST_FAILED:
      return Object.assign({}, state, {
        isFetching: false,
        books: []
      })
  }
  return state
}


