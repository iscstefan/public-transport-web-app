import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Main from './Main'

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true}>
            <Main />
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App;
