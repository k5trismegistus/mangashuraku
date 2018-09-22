import { all } from 'redux-saga/effects'
import { booksSaga } from './booksSagas'

export function* rootSaga() {
  yield all([
    ...booksSaga,
  ])
}
