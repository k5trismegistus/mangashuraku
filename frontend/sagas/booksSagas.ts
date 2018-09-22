import { call, put, takeLatest } from 'redux-saga/effects'
import {
  booksIndex
} from '../api/api'
import {
  ACTIONS,
  fetchBookListSucceeded,
  fetchBookListFailed
} from '../reducers/booksReducer'

function* doFetchBookList(action) {
  try {
     const books = yield call(booksIndex, {});
     yield put(fetchBookListSucceeded(books));
  } catch (e) {
     yield put(fetchBookListFailed());
  }
}

export const booksSaga =  [
  takeLatest(ACTIONS.FETCH_BOOK_LIST, doFetchBookList)
]
