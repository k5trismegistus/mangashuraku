import { Action } from 'redux'

// Definition of Store

export interface ReaderStore {
  currentPageNumber: number
}

export const initialReaderStore = {
  currentPageNumber: 0
}

// Definitions of Action & ActionCreator

// export enum ACTIONS {
// }

// export type ReaderActions =
//   FetchBook |
//   FetchBookSucceeded |
//   FetchBookFailed

// interface FetchBook extends Action {
//   type: ACTIONS.FETCH_BOOK
//   id: String
// }

// export const fetchBook = (id: string): FetchBook => ({
//   type: ACTIONS.FETCH_BOOK,
//   id,
// })

// interface FetchBookSucceeded extends Action {
//   type: ACTIONS.FETCH_BOOK_SUCCEEDED
//   book: Book
// }

// export const fetchBookSucceeded = (book: Book) => ({
//   type: ACTIONS.FETCH_BOOK_SUCCEEDED,
//   book
// })

// interface FetchBookFailed extends Action {
//   type: ACTIONS.FETCH_BOOK_FAILED
// }

// export const fetchBookFailed = (): FetchBookFailed => ({
//   type: ACTIONS.FETCH_BOOK_FAILED
// })

// Definition of Reducer

export const readerReducer = (state: ReaderStore = initialReaderStore, action: any) => {
  return state
}
