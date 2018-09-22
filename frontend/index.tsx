import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import { rootReducer } from './reducers'
import { rootSaga } from './sagas'
import { ApplicationContainer } from './containers'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
)
sagaMiddleware.run(rootSaga)


ReactDOM.render(
  <Provider store={store}>
    <ApplicationContainer />
  </Provider>,
  document.getElementById('root')
)
