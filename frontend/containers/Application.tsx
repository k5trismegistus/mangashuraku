import * as React from 'react'
import { Route, Switch } from 'react-router'

import TopContainer from './Top'
import ReaderContainer from './Reader'

export default class ApplicationContainer extends React.Component {
  render() {
    return (
      <div> { /* your usual react-router v4 routing */ }
        <Switch>
          <Route
            exact
            path='/'
            render={() => (<TopContainer />)}
          />
          <Route
            exact
            path='/books/:bookId'
            render={({ match }) => (<ReaderContainer match={match} />)}
          />
          <Route render={() => (<div>Miss</div>)} />
        </Switch>
      </div>
    )
  }
}
