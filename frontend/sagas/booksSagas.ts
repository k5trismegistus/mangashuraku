import { call, put, takeLatest } from 'redux-saga/effects'
import {
  getBooksIndex
} from '../api/api'
import {
  ACTIONS,
  fetchBookListSucceeded,
  fetchBookListFailed
} from '../reducers/booksReducer'

function* doFetchBookList(action) {
  try {
    const params = {}
    if (action.page) params['page'] = action.page
    if (action.query) params['q'] = action.query
    const result = yield call(getBooksIndex, params)
    yield put(fetchBookListSucceeded(result.books, result.total))
  } catch (e) {
    yield put(fetchBookListFailed())
  }
}

export const booksSaga =  [
  takeLatest(ACTIONS.FETCH_BOOK_LIST, doFetchBookList)
]
