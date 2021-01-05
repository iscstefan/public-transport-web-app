import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Main from './Main'
import Login from './Login'

class App extends React.Component {
  constructor() {
    super();
    
    this.state = {
      user: {
        username: '',
        id: '',
        token: ''
      }
    }

    this.setLogin = (username, id, token) => {
      this.state.user = {
        username: username,
        id: id,
        token: token
      }
    }
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true}>
            <Main />
          </Route>
          <Route path='/login' exact={true}>
            <Login />
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App;
