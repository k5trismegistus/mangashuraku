import  { combineReducers } from 'redux';
import {
  BookStore,
  bookReducer,
} from './bookReducer'
import {
  BooksStore,
  booksReducer
} from './booksReducer'
import {
  ReaderStore,
  readerReducer
} from './readerReducer'

export interface RootStore {
  currentBook: BookStore
  books: BooksStore
  reader: ReaderStore
}

export const rootReducer = combineReducers({
  currentBook: bookReducer,
  books: booksReducer,
  reader: readerReducer
})
