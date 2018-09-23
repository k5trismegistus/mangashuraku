import  { combineReducers } from 'redux';
import {
  BookStore,
  bookReducer,
} from './bookReducer'
import {
  BooksStore,
  booksReducer
} from './booksReducer'

export interface RootStore {
  currentBook: BookStore
  books: BooksStore
}

export const rootReducer = combineReducers({
  currentBook: bookReducer,
  books: booksReducer,
})
