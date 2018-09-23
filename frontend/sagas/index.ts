import { all } from 'redux-saga/effects'
import { booksSaga } from './booksSagas'
import { bookSaga } from './bookSagas'

export function* rootSaga() {
  yield all([
    ...booksSaga,
    ...bookSaga,
  ])
}
