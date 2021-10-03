import { call, put, takeLatest } from 'redux-saga/effects'
import {
  getBook,
  deleteBook,
} from '../api/api'
import {
  ACTIONS,
  fetchBookSucceeded,
  fetchBookFailed,
  deleteBookSucceeded,
  deleteBookFailed
} from '../reducers/bookReducer'

function* doFetchBook(action) {
  try {
    const response = yield call(getBook, action.id)
    yield put(fetchBookSucceeded(response))
  } catch (e) {
    console.error(e)
    yield put(fetchBookFailed())
  }
}

function* doDeleteBook(action) {
  try {
    const response = yield call(deleteBook, action.id)
    yield put(deleteBookSucceeded())
  } catch(e) {
    console.error(e)
    yield put(deleteBookFailed())
  }
}

export const bookSaga =  [
  takeLatest(ACTIONS.FETCH_BOOK, doFetchBook),
  takeLatest(ACTIONS.DELETE_BOOK, doDeleteBook)
]
