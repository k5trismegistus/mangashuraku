import * as React from 'react'
import { Route, Switch } from 'react-router'

import TopContainer from './Top'
import ViewerContainer from './Viewer'

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
            render={({ match }) => (<ViewerContainer match={match} />)}
          />
          <Route render={() => (<div>Miss</div>)} />
        </Switch>
      </div>
    )
  }
}
