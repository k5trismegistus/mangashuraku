import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer } from './reducers'
import { rootSaga } from './sagas'
import { ApplicationContainer } from './containers'
import { createBrowserHistory } from 'history'
import { ConnectedRouter } from 'connected-react-router'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
const history = createBrowserHistory()

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  connectRouter(history)(rootReducer),
  composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware
    )
  )
)
sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider>
        <ApplicationContainer />
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
