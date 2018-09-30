import { Action } from 'redux'
import {
  Book,
} from '../models'

// Definition of Store

export interface BookStore {
  isFetching: boolean
  book: Book | null
}

export const initialBookStore = {
  isFetching: false,
  book: null,
}

// Definitions of Action & ActionCreator

export enum ACTIONS {
  FETCH_BOOK = 'FETCH_BOOK',
  FETCH_BOOK_SUCCEEDED = 'FETCH_BOOK_SUCCEEDED',
  FETCH_BOOK_FAILED = 'FETCH_BOOK_FAILED',
}

export type BookActions =
  FetchBook |
  FetchBookSucceeded |
  FetchBookFailed

interface FetchBook extends Action {
  type: ACTIONS.FETCH_BOOK
  id: string
}

export const fetchBook = (id: string): FetchBook => ({
  type: ACTIONS.FETCH_BOOK,
  id,
})

interface FetchBookSucceeded extends Action {
  type: ACTIONS.FETCH_BOOK_SUCCEEDED
  book: Book
}

export const fetchBookSucceeded = (book: Book) => ({
  type: ACTIONS.FETCH_BOOK_SUCCEEDED,
  book
})

interface FetchBookFailed extends Action {
  type: ACTIONS.FETCH_BOOK_FAILED
}

export const fetchBookFailed = (): FetchBookFailed => ({
  type: ACTIONS.FETCH_BOOK_FAILED
})

// Definition of Reducer

export const bookReducer = (state: BookStore = initialBookStore, action: BookActions) => {
  switch (action.type) {
    case ACTIONS.FETCH_BOOK:
      return Object.assign({}, state, {
        isFetching: true,
        book: null
      })
    case ACTIONS.FETCH_BOOK_SUCCEEDED:
      return Object.assign({}, state, {
        isFetching: false,
        book: action.book
      })
    case ACTIONS.FETCH_BOOK_FAILED:
      return Object.assign({}, state, {
        isFetching: false,
        book: null
      })
  }
  return state
}
