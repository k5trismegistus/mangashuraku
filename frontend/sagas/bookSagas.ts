import { call, put, takeLatest } from 'redux-saga/effects'
import {
  book
} from '../api/api'
import {
  ACTIONS,
  fetchBookSucceeded,
  fetchBookFailed
} from '../reducers/bookReducer'

function* doFetchBook(action) {
  try {
    const b = yield call(book, action.id);
    yield put(fetchBookSucceeded(b));
  } catch (e) {
    console.log(e)
    yield put(fetchBookFailed());
  }
}

export const bookSaga =  [
  takeLatest(ACTIONS.FETCH_BOOK, doFetchBook)
]
