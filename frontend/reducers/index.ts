import  { combineReducers } from 'redux';
import {
  BooksStore,
  booksReducer
} from './booksReducer'

export interface RootStore {
  books: BooksStore
}

export const rootReducer = combineReducers({
  books: booksReducer
})
